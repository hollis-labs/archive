package broker

// MatchRequest describes what the caller needs.
type MatchRequest struct {
	Description string   `json:"description,omitempty"` // Natural language description
	Domains     []string `json:"domains,omitempty"`     // Required domains
	Roles       []string `json:"roles,omitempty"`       // Required roles
	Skills      []string `json:"skills,omitempty"`      // Required skills
	TaskType    string   `json:"task_type,omitempty"`    // consultation, delegation, execution
	ExcludeIDs  []string `json:"exclude_ids,omitempty"` // Agent IDs to exclude
	SessionID   string   `json:"session_id,omitempty"`  // For affinity scoring
	MaxResults  int      `json:"max_results,omitempty"` // Default 5
}

// TaskType constants.
const (
	TaskConsultation = "consultation"
	TaskDelegation   = "delegation"
	TaskExecution    = "execution"
)

// Candidate is a ranked agent match.
type Candidate struct {
	AgentID      string              `json:"agent_id"`
	Name         string              `json:"name"`
	Slug         string              `json:"slug"`
	Score        float64             `json:"score"`         // 0.0 - 1.0
	ScoreDetails map[string]float64  `json:"score_details"` // Breakdown
	Capabilities map[string][]string `json:"capabilities"`
	Contact      map[string]string   `json:"contact,omitempty"`
	Available    bool                `json:"available"`
}

// MatchResult is the response from a match operation.
type MatchResult struct {
	Candidates []Candidate  `json:"candidates"`
	Total      int          `json:"total"`    // Total before filtering
	Filtered   int          `json:"filtered"` // Removed by gating
	Request    MatchRequest `json:"request"`
}
