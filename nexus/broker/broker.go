package broker

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"
	"strings"

	"github.com/hollis-labs/nexus/registry"
)

const defaultMaxResults = 5

// AgentBroker implements the Broker interface using a registry for agent discovery.
type AgentBroker struct {
	registry registry.Registry
}

// New creates an AgentBroker backed by the given registry.
func New(reg registry.Registry) *AgentBroker {
	return &AgentBroker{registry: reg}
}

// Match finds and ranks agents that can handle the request.
func (b *AgentBroker) Match(ctx context.Context, req MatchRequest) (MatchResult, error) {
	// --- Selection ---
	agents, err := b.selectCandidates(ctx, req)
	if err != nil {
		return MatchResult{}, fmt.Errorf("broker: selection failed: %w", err)
	}
	totalCount := len(agents)

	// --- Gating ---
	agents = b.gate(agents, req)
	filteredCount := totalCount - len(agents)

	// --- Filtering / Scoring ---
	candidates := make([]Candidate, 0, len(agents))
	for _, agent := range agents {
		c := b.score(agent, req)
		candidates = append(candidates, c)
	}

	// Sort by score descending.
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].Score > candidates[j].Score
	})

	// Limit results.
	maxResults := req.MaxResults
	if maxResults <= 0 {
		maxResults = defaultMaxResults
	}
	if len(candidates) > maxResults {
		candidates = candidates[:maxResults]
	}

	return MatchResult{
		Candidates: candidates,
		Total:      totalCount,
		Filtered:   filteredCount,
		Request:    req,
	}, nil
}

// selectCandidates uses the registry to find agents matching the request criteria.
func (b *AgentBroker) selectCandidates(ctx context.Context, req MatchRequest) ([]registry.AgentConfig, error) {
	hasCriteria := len(req.Domains) > 0 || len(req.Roles) > 0 || len(req.Skills) > 0

	if hasCriteria {
		return b.registry.Discover(ctx, registry.DiscoverOptions{
			Domains: req.Domains,
			Roles:   req.Roles,
			Skills:  req.Skills,
		})
	}

	// No capability criteria — return all active agents.
	return b.registry.List(ctx, registry.WithStatus(registry.StatusActive))
}

// gate removes agents that cannot accept work right now.
func (b *AgentBroker) gate(agents []registry.AgentConfig, req MatchRequest) []registry.AgentConfig {
	excludeSet := make(map[string]struct{}, len(req.ExcludeIDs))
	for _, id := range req.ExcludeIDs {
		excludeSet[id] = struct{}{}
	}

	result := make([]registry.AgentConfig, 0, len(agents))
	for _, agent := range agents {
		// Exclude by ID.
		if _, excluded := excludeSet[agent.ID]; excluded {
			continue
		}

		// Must be active status.
		if agent.Status != registry.StatusActive {
			continue
		}

		// Check limits.availability if present.
		limits := parseLimits(agent.Limits)
		if limits.Availability != "" && limits.Availability != "active" {
			continue
		}

		// Execution tasks require CanExecute.
		if req.TaskType == TaskExecution && !agent.CanExecute {
			continue
		}

		result = append(result, agent)
	}

	return result
}

// score computes a match score for an agent against the request.
func (b *AgentBroker) score(agent registry.AgentConfig, req MatchRequest) Candidate {
	caps := parseCapabilities(agent.Capabilities)
	contact := parseContact(agent.Contact)
	limits := parseLimits(agent.Limits)
	details := make(map[string]float64)

	// --- capability_match (0.0 - 0.5) ---
	var capScore float64
	totalWeight := 0.0

	if len(req.Domains) > 0 {
		domainOverlap := computeOverlap(req.Domains, caps["domains"])
		capScore += domainOverlap * 0.25
		totalWeight += 0.25
	}
	if len(req.Roles) > 0 {
		roleOverlap := computeOverlap(req.Roles, caps["roles"])
		capScore += roleOverlap * 0.15
		totalWeight += 0.15
	}
	if len(req.Skills) > 0 {
		skillOverlap := computeOverlap(req.Skills, caps["skills"])
		capScore += skillOverlap * 0.10
		totalWeight += 0.10
	}

	// If no criteria specified, give full capability score.
	if totalWeight == 0 {
		capScore = 0.5
	} else {
		// Scale to fill the 0.5 range proportionally.
		capScore = capScore * (0.5 / totalWeight)
	}
	details["capability_match"] = capScore

	// --- capability_depth (0.0 - 0.2) ---
	var depthScore float64
	totalRequested := len(req.Domains) + len(req.Roles) + len(req.Skills)
	totalAvailable := len(caps["domains"]) + len(caps["roles"]) + len(caps["skills"])
	if totalRequested > 0 && totalAvailable > totalRequested {
		// Specialist bonus: agent has more capabilities than needed.
		extra := float64(totalAvailable-totalRequested) / float64(totalAvailable)
		depthScore = extra * 0.2
		if depthScore > 0.2 {
			depthScore = 0.2
		}
	} else if totalRequested == 0 {
		depthScore = 0.1 // Neutral when no criteria specified.
	}
	details["capability_depth"] = depthScore

	// --- execution_fit (0.0 - 0.15) ---
	var execScore float64
	switch req.TaskType {
	case TaskExecution:
		if agent.CanExecute {
			execScore = 0.15
		}
	case TaskConsultation:
		if !agent.CanExecute {
			execScore = 0.15 // Non-executor = planner = good for consultation.
		} else {
			execScore = 0.10 // Executors can consult too, just not ideal.
		}
	default:
		execScore = 0.15 // No task type preference — full score.
	}
	details["execution_fit"] = execScore

	// --- availability (0.0 - 0.15) ---
	var availScore float64
	if limits.MaxConcurrentSessions <= 0 {
		availScore = 0.15 // No limits set — full score.
	} else {
		// Score based on how far below the limit.
		used := float64(limits.ActiveSessions)
		max := float64(limits.MaxConcurrentSessions)
		if used < max {
			availScore = ((max - used) / max) * 0.15
		}
		// If at or above limit, score stays 0.
	}
	details["availability"] = availScore

	totalScore := capScore + depthScore + execScore + availScore
	if totalScore > 1.0 {
		totalScore = 1.0
	}

	return Candidate{
		AgentID:      agent.ID,
		Name:         agent.Name,
		Slug:         agent.Slug,
		Score:        totalScore,
		ScoreDetails: details,
		Capabilities: caps,
		Contact:      contact,
		Available:    true,
	}
}

// --- Helper types and functions ---

type agentLimits struct {
	MaxConcurrentSessions int    `json:"max_concurrent_sessions"`
	ActiveSessions        int    `json:"active_sessions"`
	Availability          string `json:"availability"`
}

// parseLimits extracts limit info from the JSON limits field.
func parseLimits(jsonStr string) agentLimits {
	var l agentLimits
	if jsonStr == "" {
		return l
	}
	_ = json.Unmarshal([]byte(jsonStr), &l)
	return l
}

// parseCapabilities extracts domains/roles/skills from the JSON capabilities field.
func parseCapabilities(jsonStr string) map[string][]string {
	result := map[string][]string{
		"domains": {},
		"roles":   {},
		"skills":  {},
	}
	if jsonStr == "" {
		return result
	}

	var raw map[string]json.RawMessage
	if err := json.Unmarshal([]byte(jsonStr), &raw); err != nil {
		return result
	}

	for _, key := range []string{"domains", "roles", "skills", "tools_expertise"} {
		if data, ok := raw[key]; ok {
			var vals []string
			if err := json.Unmarshal(data, &vals); err == nil {
				result[key] = vals
			}
		}
	}

	return result
}

// parseContact extracts contact channels from the JSON contact field.
func parseContact(jsonStr string) map[string]string {
	result := make(map[string]string)
	if jsonStr == "" {
		return result
	}
	_ = json.Unmarshal([]byte(jsonStr), &result)
	return result
}

// computeOverlap returns the fraction of requested items found in available.
func computeOverlap(requested, available []string) float64 {
	if len(requested) == 0 {
		return 1.0
	}

	availSet := make(map[string]struct{}, len(available))
	for _, v := range available {
		availSet[strings.ToLower(v)] = struct{}{}
	}

	matches := 0
	for _, r := range requested {
		if _, ok := availSet[strings.ToLower(r)]; ok {
			matches++
		}
	}

	return float64(matches) / float64(len(requested))
}
