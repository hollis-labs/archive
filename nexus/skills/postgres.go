package skills

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// PostgresStore implements Registry backed by PostgreSQL.
type PostgresStore struct {
	db *sql.DB
}

// NewPostgresStore creates a new Postgres-backed skill registry.
func NewPostgresStore(db *sql.DB) *PostgresStore {
	return &PostgresStore{db: db}
}

func (s *PostgresStore) Create(ctx context.Context, input CreateInput) (Skill, error) {
	if input.Name == "" {
		return Skill{}, fmt.Errorf("create skill: name is required")
	}
	if input.Slug == "" {
		return Skill{}, fmt.Errorf("create skill: slug is required")
	}
	if input.Content == "" {
		return Skill{}, fmt.Errorf("create skill: content is required")
	}

	id := uuid.New().String()
	now := time.Now().UTC()

	defaults(&input)
	hash := computeHash(input.Content)

	skill := Skill{
		ID:          id,
		Name:        input.Name,
		Slug:        input.Slug,
		Description: input.Description,
		Category:    input.Category,
		Content:     input.Content,
		ContentHash: hash,
		Version:     1,
		Tags:        input.Tags,
		Status:      StatusActive,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	_, err := s.db.ExecContext(ctx, `
		INSERT INTO nexus_skills (id, name, slug, description, category, content,
			content_hash, version, tags, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
		skill.ID, skill.Name, skill.Slug, skill.Description, skill.Category, skill.Content,
		skill.ContentHash, skill.Version, skill.Tags, skill.Status, skill.CreatedAt, skill.UpdatedAt,
	)
	if err != nil {
		return Skill{}, fmt.Errorf("create skill: %w", err)
	}

	return skill, nil
}

func (s *PostgresStore) Get(ctx context.Context, skillID string) (Skill, error) {
	row := s.db.QueryRowContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_skills WHERE id = $1`, skillColumns()), skillID)

	var sk Skill
	if err := scanSkill(row, &sk); err == sql.ErrNoRows {
		return Skill{}, fmt.Errorf("skill not found: %s", skillID)
	} else if err != nil {
		return Skill{}, fmt.Errorf("get skill: %w", err)
	}
	return sk, nil
}

func (s *PostgresStore) GetBySlug(ctx context.Context, slug string) (Skill, error) {
	row := s.db.QueryRowContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_skills WHERE slug = $1`, skillColumns()), slug)

	var sk Skill
	if err := scanSkill(row, &sk); err == sql.ErrNoRows {
		return Skill{}, fmt.Errorf("skill not found by slug: %s", slug)
	} else if err != nil {
		return Skill{}, fmt.Errorf("get skill by slug: %w", err)
	}
	return sk, nil
}

func (s *PostgresStore) List(ctx context.Context, opts ...ListOption) ([]Skill, error) {
	options := &ListOptions{Limit: 50}
	for _, o := range opts {
		o(options)
	}

	var conditions []string
	var args []interface{}
	argN := 1

	if options.Category != "" {
		conditions = append(conditions, fmt.Sprintf("category = $%d", argN))
		args = append(args, options.Category)
		argN++
	}

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
		SELECT %s FROM nexus_skills
		%s
		ORDER BY name
		LIMIT $%d OFFSET $%d`,
		skillColumns(), where, argN, argN+1,
	)
	args = append(args, options.Limit, options.Offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("list skills: %w", err)
	}
	defer rows.Close()

	return scanSkills(rows)
}

func (s *PostgresStore) Update(ctx context.Context, skillID string, input CreateInput) (Skill, error) {
	if skillID == "" {
		return Skill{}, fmt.Errorf("update skill: id is required")
	}

	existing, err := s.Get(ctx, skillID)
	if err != nil {
		return Skill{}, fmt.Errorf("update skill: %w", err)
	}

	defaults(&input)
	hash := computeHash(input.Content)

	// No-op if content hash unchanged.
	if hash == existing.ContentHash {
		return existing, nil
	}

	now := time.Now().UTC()
	newVersion := existing.Version + 1

	_, err = s.db.ExecContext(ctx, `
		UPDATE nexus_skills SET
			name = $1, slug = $2, description = $3, category = $4, content = $5,
			content_hash = $6, version = $7, tags = $8, updated_at = $9
		WHERE id = $10`,
		input.Name, input.Slug, input.Description, input.Category, input.Content,
		hash, newVersion, input.Tags, now, skillID,
	)
	if err != nil {
		return Skill{}, fmt.Errorf("update skill: %w", err)
	}

	return Skill{
		ID:          skillID,
		Name:        input.Name,
		Slug:        input.Slug,
		Description: input.Description,
		Category:    input.Category,
		Content:     input.Content,
		ContentHash: hash,
		Version:     newVersion,
		Tags:        input.Tags,
		Status:      existing.Status,
		CreatedAt:   existing.CreatedAt,
		UpdatedAt:   now,
	}, nil
}

func (s *PostgresStore) Delete(ctx context.Context, skillID string) error {
	res, err := s.db.ExecContext(ctx, `DELETE FROM nexus_skills WHERE id = $1`, skillID)
	if err != nil {
		return fmt.Errorf("delete skill: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("skill not found: %s", skillID)
	}
	return nil
}

func (s *PostgresStore) Search(ctx context.Context, opts SearchOptions) ([]Skill, error) {
	var conditions []string
	var args []interface{}
	argN := 1

	if opts.Query != "" {
		conditions = append(conditions, fmt.Sprintf(
			"to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || content) @@ plainto_tsquery('english', $%d)", argN))
		args = append(args, opts.Query)
		argN++
	}

	if opts.Category != "" {
		conditions = append(conditions, fmt.Sprintf("category = $%d", argN))
		args = append(args, opts.Category)
		argN++
	}

	if len(opts.Tags) > 0 {
		conditions = append(conditions, fmt.Sprintf("tags ?| $%d", argN))
		args = append(args, pgTextArray(opts.Tags))
		argN++
	}

	// Always filter for active skills.
	conditions = append(conditions, fmt.Sprintf("status = $%d", argN))
	args = append(args, StatusActive)

	query := fmt.Sprintf(`
		SELECT %s FROM nexus_skills
		WHERE %s
		ORDER BY name`,
		skillColumns(),
		strings.Join(conditions, " AND "),
	)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("search skills: %w", err)
	}
	defer rows.Close()

	return scanSkills(rows)
}

func (s *PostgresStore) Assign(ctx context.Context, skillID, agentID string, config string) error {
	if config == "" {
		config = "{}"
	}
	now := time.Now().UTC()

	_, err := s.db.ExecContext(ctx, `
		INSERT INTO nexus_skill_assignments (skill_id, agent_id, config, created_at)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (skill_id, agent_id) DO UPDATE SET config = $3`,
		skillID, agentID, config, now,
	)
	if err != nil {
		return fmt.Errorf("assign skill: %w", err)
	}
	return nil
}

func (s *PostgresStore) Unassign(ctx context.Context, skillID, agentID string) error {
	_, err := s.db.ExecContext(ctx, `
		DELETE FROM nexus_skill_assignments WHERE skill_id = $1 AND agent_id = $2`,
		skillID, agentID,
	)
	if err != nil {
		return fmt.Errorf("unassign skill: %w", err)
	}
	return nil
}

func (s *PostgresStore) AgentSkills(ctx context.Context, agentID string) ([]Skill, error) {
	query := fmt.Sprintf(`
		SELECT %s FROM nexus_skills s
		JOIN nexus_skill_assignments a ON a.skill_id = s.id
		WHERE a.agent_id = $1
		ORDER BY s.name`, skillColumns())

	rows, err := s.db.QueryContext(ctx, query, agentID)
	if err != nil {
		return nil, fmt.Errorf("agent skills: %w", err)
	}
	defer rows.Close()

	return scanSkills(rows)
}

func (s *PostgresStore) SkillAgents(ctx context.Context, skillID string) ([]string, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT agent_id FROM nexus_skill_assignments WHERE skill_id = $1
		ORDER BY agent_id`, skillID)
	if err != nil {
		return nil, fmt.Errorf("skill agents: %w", err)
	}
	defer rows.Close()

	var agents []string
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err != nil {
			return nil, fmt.Errorf("scan agent id: %w", err)
		}
		agents = append(agents, id)
	}
	return agents, rows.Err()
}

// skillColumns returns the SELECT column list for skills.
func skillColumns() string {
	return `id, name, slug, COALESCE(description, ''), COALESCE(category, ''),
		content, content_hash, version, COALESCE(tags, '[]'),
		COALESCE(status, 'active'), created_at, updated_at`
}

// scanSkill scans a single row into a Skill.
func scanSkill(row *sql.Row, sk *Skill) error {
	return row.Scan(
		&sk.ID, &sk.Name, &sk.Slug, &sk.Description, &sk.Category,
		&sk.Content, &sk.ContentHash, &sk.Version, &sk.Tags,
		&sk.Status, &sk.CreatedAt, &sk.UpdatedAt,
	)
}

// scanSkills scans multiple rows into a slice of Skills.
func scanSkills(rows *sql.Rows) ([]Skill, error) {
	var skills []Skill
	for rows.Next() {
		var sk Skill
		err := rows.Scan(
			&sk.ID, &sk.Name, &sk.Slug, &sk.Description, &sk.Category,
			&sk.Content, &sk.ContentHash, &sk.Version, &sk.Tags,
			&sk.Status, &sk.CreatedAt, &sk.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("scan skill: %w", err)
		}
		skills = append(skills, sk)
	}
	return skills, rows.Err()
}

// computeHash returns the SHA-256 hash of the skill content.
func computeHash(content string) string {
	h := sha256.New()
	h.Write([]byte(content))
	return hex.EncodeToString(h.Sum(nil))
}

// defaults fills in empty JSON fields with safe defaults.
func defaults(input *CreateInput) {
	if input.Tags == "" {
		input.Tags = "[]"
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
