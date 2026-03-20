-- Skills registry: queryable, versionable skill definitions assignable to agents.

CREATE TABLE IF NOT EXISTS nexus_skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    category TEXT DEFAULT '',
    content TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    tags JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'disabled', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nexus_skill_assignments (
    skill_id TEXT NOT NULL REFERENCES nexus_skills(id) ON DELETE CASCADE,
    agent_id TEXT NOT NULL REFERENCES nexus_agent_configs(id) ON DELETE CASCADE,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (skill_id, agent_id)
);

CREATE INDEX IF NOT EXISTS idx_nexus_skills_slug ON nexus_skills(slug);
CREATE INDEX IF NOT EXISTS idx_nexus_skills_category ON nexus_skills(category);
CREATE INDEX IF NOT EXISTS idx_nexus_skills_status ON nexus_skills(status);
CREATE INDEX IF NOT EXISTS idx_nexus_skill_assignments_agent ON nexus_skill_assignments(agent_id);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_nexus_skills_search ON nexus_skills USING gin(to_tsvector('english', name || ' ' || description || ' ' || content));
