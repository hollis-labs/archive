package registry

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// PostgresStore implements Registry backed by PostgreSQL.
type PostgresStore struct {
	db *sql.DB
}

// NewPostgresStore creates a new Postgres-backed agent registry.
func NewPostgresStore(db *sql.DB) *PostgresStore {
	return &PostgresStore{db: db}
}

func (s *PostgresStore) Register(ctx context.Context, input RegisterInput) (AgentConfig, error) {
	if input.Name == "" {
		return AgentConfig{}, fmt.Errorf("register agent: name is required")
	}
	if input.Slug == "" {
		return AgentConfig{}, fmt.Errorf("register agent: slug is required")
	}
	if input.SystemPrompt == "" {
		return AgentConfig{}, fmt.Errorf("register agent: system_prompt is required")
	}

	// Check if agent already exists by slug — if so, delegate to Update.
	existing, err := s.GetBySlug(ctx, input.Slug)
	if err == nil {
		input.ID = existing.ID
		cfg, _, err := s.Update(ctx, input)
		return cfg, err
	}

	id := input.ID
	if id == "" {
		id = uuid.New().String()
	}
	now := time.Now().UTC()

	defaults(&input)
	hash := computeHash(input)

	cfg := AgentConfig{
		ID:              id,
		Name:            input.Name,
		Slug:            input.Slug,
		Description:     input.Description,
		Avatar:          input.Avatar,
		SystemPrompt:    input.SystemPrompt,
		DefaultModel:    input.DefaultModel,
		DefaultMode:     input.DefaultMode,
		Modes:           input.Modes,
		MCPServers:      input.MCPServers,
		ToolPermissions: input.ToolPermissions,
		CanExecute:      input.CanExecute,
		Capabilities:    input.Capabilities,
		Contact:         input.Contact,
		Limits:          input.Limits,
		ModelStrategy:   input.ModelStrategy,
		Settings:        input.Settings,
		ProfileHash:     hash,
		Version:         1,
		Status:          StatusActive,
		CreatedAt:       now,
		UpdatedAt:       now,
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return AgentConfig{}, fmt.Errorf("register agent: %w", err)
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx, `
		INSERT INTO nexus_agent_configs (id, name, slug, description, avatar, system_prompt,
			default_model, default_mode, modes, mcp_servers, tool_permissions, can_execute,
			capabilities, contact, limits, model_strategy, settings,
			profile_hash, version, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
		cfg.ID, cfg.Name, cfg.Slug, cfg.Description, cfg.Avatar, cfg.SystemPrompt,
		cfg.DefaultModel, cfg.DefaultMode, cfg.Modes, cfg.MCPServers, cfg.ToolPermissions, cfg.CanExecute,
		cfg.Capabilities, cfg.Contact, cfg.Limits, cfg.ModelStrategy, cfg.Settings,
		cfg.ProfileHash, cfg.Version, cfg.Status, cfg.CreatedAt, cfg.UpdatedAt,
	)
	if err != nil {
		return AgentConfig{}, fmt.Errorf("register agent: %w", err)
	}

	// Insert first revision.
	profileData, _ := json.Marshal(cfg)
	revID := uuid.New().String()
	_, err = tx.ExecContext(ctx, `
		INSERT INTO nexus_agent_config_revisions (id, agent_id, version, profile_hash, profile_data, changed_by, change_note, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
		revID, cfg.ID, cfg.Version, cfg.ProfileHash, string(profileData), input.ChangedBy, input.ChangeNote, now,
	)
	if err != nil {
		return AgentConfig{}, fmt.Errorf("register agent revision: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return AgentConfig{}, fmt.Errorf("register agent commit: %w", err)
	}

	return cfg, nil
}

func (s *PostgresStore) Get(ctx context.Context, agentID string) (AgentConfig, error) {
	row := s.db.QueryRowContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_agent_configs WHERE id = $1`, agentColumns()), agentID)

	var cfg AgentConfig
	if err := scanAgent(row, &cfg); err == sql.ErrNoRows {
		return AgentConfig{}, fmt.Errorf("agent not found: %s", agentID)
	} else if err != nil {
		return AgentConfig{}, fmt.Errorf("get agent: %w", err)
	}
	return cfg, nil
}

func (s *PostgresStore) GetBySlug(ctx context.Context, slug string) (AgentConfig, error) {
	row := s.db.QueryRowContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_agent_configs WHERE slug = $1`, agentColumns()), slug)

	var cfg AgentConfig
	if err := scanAgent(row, &cfg); err == sql.ErrNoRows {
		return AgentConfig{}, fmt.Errorf("agent not found by slug: %s", slug)
	} else if err != nil {
		return AgentConfig{}, fmt.Errorf("get agent by slug: %w", err)
	}
	return cfg, nil
}

func (s *PostgresStore) List(ctx context.Context, opts ...ListOption) ([]AgentConfig, error) {
	options := &ListOptions{Limit: 50}
	for _, o := range opts {
		o(options)
	}

	var conditions []string
	var args []interface{}
	argN := 1

	if options.Status != "" {
		conditions = append(conditions, fmt.Sprintf("status = $%d", argN))
		args = append(args, options.Status)
		argN++
	}

	where := ""
	if len(conditions) > 0 {
		where = "WHERE " + strings.Join(conditions, " AND ")
	}

	query := fmt.Sprintf(`
		SELECT %s FROM nexus_agent_configs
		%s
		ORDER BY name
		LIMIT $%d OFFSET $%d`,
		agentColumns(), where, argN, argN+1,
	)
	args = append(args, options.Limit, options.Offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("list agents: %w", err)
	}
	defer rows.Close()

	return scanAgents(rows)
}

func (s *PostgresStore) Update(ctx context.Context, input RegisterInput) (AgentConfig, Revision, error) {
	if input.ID == "" {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent: id is required")
	}

	existing, err := s.Get(ctx, input.ID)
	if err != nil {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent: %w", err)
	}

	defaults(&input)
	hash := computeHash(input)

	// No-op if content hash unchanged.
	if hash == existing.ProfileHash {
		return existing, Revision{}, nil
	}

	now := time.Now().UTC()
	newVersion := existing.Version + 1

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent: %w", err)
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx, `
		UPDATE nexus_agent_configs SET
			name = $1, slug = $2, description = $3, avatar = $4, system_prompt = $5,
			default_model = $6, default_mode = $7, modes = $8, mcp_servers = $9,
			tool_permissions = $10, can_execute = $11, capabilities = $12, contact = $13,
			limits = $14, model_strategy = $15, settings = $16,
			profile_hash = $17, version = $18, updated_at = $19
		WHERE id = $20`,
		input.Name, input.Slug, input.Description, input.Avatar, input.SystemPrompt,
		input.DefaultModel, input.DefaultMode, input.Modes, input.MCPServers,
		input.ToolPermissions, input.CanExecute, input.Capabilities, input.Contact,
		input.Limits, input.ModelStrategy, input.Settings,
		hash, newVersion, now, input.ID,
	)
	if err != nil {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent: %w", err)
	}

	cfg := AgentConfig{
		ID:              input.ID,
		Name:            input.Name,
		Slug:            input.Slug,
		Description:     input.Description,
		Avatar:          input.Avatar,
		SystemPrompt:    input.SystemPrompt,
		DefaultModel:    input.DefaultModel,
		DefaultMode:     input.DefaultMode,
		Modes:           input.Modes,
		MCPServers:      input.MCPServers,
		ToolPermissions: input.ToolPermissions,
		CanExecute:      input.CanExecute,
		Capabilities:    input.Capabilities,
		Contact:         input.Contact,
		Limits:          input.Limits,
		ModelStrategy:   input.ModelStrategy,
		Settings:        input.Settings,
		ProfileHash:     hash,
		Version:         newVersion,
		Status:          existing.Status,
		CreatedAt:       existing.CreatedAt,
		UpdatedAt:       now,
	}

	profileData, _ := json.Marshal(cfg)
	revID := uuid.New().String()
	rev := Revision{
		ID:          revID,
		AgentID:     input.ID,
		Version:     newVersion,
		ProfileHash: hash,
		ProfileData: string(profileData),
		ChangedBy:   input.ChangedBy,
		ChangeNote:  input.ChangeNote,
		CreatedAt:   now,
	}

	_, err = tx.ExecContext(ctx, `
		INSERT INTO nexus_agent_config_revisions (id, agent_id, version, profile_hash, profile_data, changed_by, change_note, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
		rev.ID, rev.AgentID, rev.Version, rev.ProfileHash, rev.ProfileData, rev.ChangedBy, rev.ChangeNote, rev.CreatedAt,
	)
	if err != nil {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent revision: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return AgentConfig{}, Revision{}, fmt.Errorf("update agent commit: %w", err)
	}

	return cfg, rev, nil
}

func (s *PostgresStore) Delete(ctx context.Context, agentID string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("delete agent: %w", err)
	}
	defer tx.Rollback()

	// Delete revisions first (FK constraint).
	_, err = tx.ExecContext(ctx, `DELETE FROM nexus_agent_config_revisions WHERE agent_id = $1`, agentID)
	if err != nil {
		return fmt.Errorf("delete agent revisions: %w", err)
	}

	res, err := tx.ExecContext(ctx, `DELETE FROM nexus_agent_configs WHERE id = $1`, agentID)
	if err != nil {
		return fmt.Errorf("delete agent: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("agent not found: %s", agentID)
	}

	return tx.Commit()
}

func (s *PostgresStore) History(ctx context.Context, agentID string) ([]Revision, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT id, agent_id, version, profile_hash, profile_data,
			COALESCE(changed_by, ''), COALESCE(change_note, ''), created_at
		FROM nexus_agent_config_revisions
		WHERE agent_id = $1
		ORDER BY version DESC`, agentID)
	if err != nil {
		return nil, fmt.Errorf("history: %w", err)
	}
	defer rows.Close()

	var revisions []Revision
	for rows.Next() {
		var r Revision
		if err := rows.Scan(&r.ID, &r.AgentID, &r.Version, &r.ProfileHash,
			&r.ProfileData, &r.ChangedBy, &r.ChangeNote, &r.CreatedAt); err != nil {
			return nil, fmt.Errorf("scan revision: %w", err)
		}
		revisions = append(revisions, r)
	}
	return revisions, rows.Err()
}

func (s *PostgresStore) Compare(ctx context.Context, hashA, hashB string) (Diff, error) {
	var revA, revB Revision

	err := s.db.QueryRowContext(ctx, `
		SELECT id, agent_id, version, profile_hash, profile_data,
			COALESCE(changed_by, ''), COALESCE(change_note, ''), created_at
		FROM nexus_agent_config_revisions WHERE profile_hash = $1`, hashA,
	).Scan(&revA.ID, &revA.AgentID, &revA.Version, &revA.ProfileHash,
		&revA.ProfileData, &revA.ChangedBy, &revA.ChangeNote, &revA.CreatedAt)
	if err == sql.ErrNoRows {
		return Diff{}, fmt.Errorf("revision not found for hash: %s", hashA)
	}
	if err != nil {
		return Diff{}, fmt.Errorf("compare fetch A: %w", err)
	}

	err = s.db.QueryRowContext(ctx, `
		SELECT id, agent_id, version, profile_hash, profile_data,
			COALESCE(changed_by, ''), COALESCE(change_note, ''), created_at
		FROM nexus_agent_config_revisions WHERE profile_hash = $1`, hashB,
	).Scan(&revB.ID, &revB.AgentID, &revB.Version, &revB.ProfileHash,
		&revB.ProfileData, &revB.ChangedBy, &revB.ChangeNote, &revB.CreatedAt)
	if err == sql.ErrNoRows {
		return Diff{}, fmt.Errorf("revision not found for hash: %s", hashB)
	}
	if err != nil {
		return Diff{}, fmt.Errorf("compare fetch B: %w", err)
	}

	return Diff{
		HashA:    hashA,
		HashB:    hashB,
		ProfileA: revA.ProfileData,
		ProfileB: revB.ProfileData,
		VersionA: revA.Version,
		VersionB: revB.Version,
	}, nil
}

func (s *PostgresStore) Discover(ctx context.Context, opts DiscoverOptions) ([]AgentConfig, error) {
	var conditions []string
	var args []interface{}
	argN := 1

	// Always filter for active agents.
	conditions = append(conditions, fmt.Sprintf("status = $%d", argN))
	args = append(args, StatusActive)
	argN++

	if len(opts.Domains) > 0 {
		conditions = append(conditions, fmt.Sprintf("capabilities->'domains' ?| $%d", argN))
		args = append(args, pgTextArray(opts.Domains))
		argN++
	}

	if len(opts.Roles) > 0 {
		conditions = append(conditions, fmt.Sprintf("capabilities->'roles' ?| $%d", argN))
		args = append(args, pgTextArray(opts.Roles))
		argN++
	}

	if len(opts.Skills) > 0 {
		conditions = append(conditions, fmt.Sprintf("capabilities->'skills' ?| $%d", argN))
		args = append(args, pgTextArray(opts.Skills))
		argN++
	}

	query := fmt.Sprintf(`
		SELECT %s FROM nexus_agent_configs
		WHERE %s
		ORDER BY name`,
		agentColumns(),
		strings.Join(conditions, " AND "),
	)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("discover agents: %w", err)
	}
	defer rows.Close()

	return scanAgents(rows)
}

// agentColumns returns the SELECT column list for agent configs.
func agentColumns() string {
	return `id, name, slug, COALESCE(description, ''), COALESCE(avatar, ''), system_prompt,
		COALESCE(default_model, ''), COALESCE(default_mode, 'default'),
		COALESCE(modes, '[]'), COALESCE(mcp_servers, '[]'), COALESCE(tool_permissions, '{}'),
		can_execute,
		COALESCE(capabilities, '{}'), COALESCE(contact, '{}'), COALESCE(limits, '{}'),
		COALESCE(model_strategy, '{}'), COALESCE(settings, '{}'),
		profile_hash, version, COALESCE(status, 'active'), created_at, updated_at`
}

// scanAgent scans a single row into an AgentConfig.
func scanAgent(row *sql.Row, cfg *AgentConfig) error {
	return row.Scan(
		&cfg.ID, &cfg.Name, &cfg.Slug, &cfg.Description, &cfg.Avatar, &cfg.SystemPrompt,
		&cfg.DefaultModel, &cfg.DefaultMode,
		&cfg.Modes, &cfg.MCPServers, &cfg.ToolPermissions,
		&cfg.CanExecute,
		&cfg.Capabilities, &cfg.Contact, &cfg.Limits,
		&cfg.ModelStrategy, &cfg.Settings,
		&cfg.ProfileHash, &cfg.Version, &cfg.Status, &cfg.CreatedAt, &cfg.UpdatedAt,
	)
}

// scanAgents scans multiple rows into a slice of AgentConfigs.
func scanAgents(rows *sql.Rows) ([]AgentConfig, error) {
	var agents []AgentConfig
	for rows.Next() {
		var cfg AgentConfig
		err := rows.Scan(
			&cfg.ID, &cfg.Name, &cfg.Slug, &cfg.Description, &cfg.Avatar, &cfg.SystemPrompt,
			&cfg.DefaultModel, &cfg.DefaultMode,
			&cfg.Modes, &cfg.MCPServers, &cfg.ToolPermissions,
			&cfg.CanExecute,
			&cfg.Capabilities, &cfg.Contact, &cfg.Limits,
			&cfg.ModelStrategy, &cfg.Settings,
			&cfg.ProfileHash, &cfg.Version, &cfg.Status, &cfg.CreatedAt, &cfg.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("scan agent: %w", err)
		}
		agents = append(agents, cfg)
	}
	return agents, rows.Err()
}

// computeHash returns the SHA-256 hash of the content-significant fields.
func computeHash(input RegisterInput) string {
	h := sha256.New()
	h.Write([]byte(input.SystemPrompt))
	h.Write([]byte(input.Modes))
	h.Write([]byte(input.MCPServers))
	h.Write([]byte(input.ToolPermissions))
	h.Write([]byte(input.Capabilities))
	return hex.EncodeToString(h.Sum(nil))
}

// defaults fills in empty JSON fields with safe defaults.
func defaults(input *RegisterInput) {
	if input.DefaultMode == "" {
		input.DefaultMode = "default"
	}
	if input.Modes == "" {
		input.Modes = "[]"
	}
	if input.MCPServers == "" {
		input.MCPServers = "[]"
	}
	if input.ToolPermissions == "" {
		input.ToolPermissions = "{}"
	}
	if input.Capabilities == "" {
		input.Capabilities = "{}"
	}
	if input.Contact == "" {
		input.Contact = "{}"
	}
	if input.Limits == "" {
		input.Limits = "{}"
	}
	if input.ModelStrategy == "" {
		input.ModelStrategy = "{}"
	}
	if input.Settings == "" {
		input.Settings = "{}"
	}
}

// pgTextArray formats a string slice as a Postgres text array literal.
func pgTextArray(vals []string) string {
	escaped := make([]string, len(vals))
	for i, v := range vals {
		escaped[i] = `"` + strings.ReplaceAll(v, `"`, `\"`) + `"`
	}
	return "{" + strings.Join(escaped, ",") + "}"
}
