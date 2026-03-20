-- Nexus agent config registry with versioning
-- Used by hollis-labs/nexus registry package

CREATE TABLE IF NOT EXISTS nexus_agent_configs (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    description     TEXT DEFAULT '',
    avatar          TEXT DEFAULT '',
    system_prompt   TEXT NOT NULL,
    default_model   TEXT DEFAULT '',
    default_mode    TEXT DEFAULT 'default',
    modes           JSONB DEFAULT '[]',
    mcp_servers     JSONB DEFAULT '[]',
    tool_permissions JSONB DEFAULT '{}',
    can_execute     BOOLEAN DEFAULT FALSE,
    capabilities    JSONB DEFAULT '{}',
    contact         JSONB DEFAULT '{}',
    limits          JSONB DEFAULT '{}',
    model_strategy  JSONB DEFAULT '{}',
    settings        JSONB DEFAULT '{}',
    profile_hash    TEXT NOT NULL,
    version         INTEGER NOT NULL DEFAULT 1,
    status          TEXT DEFAULT 'active' CHECK(status IN ('active', 'disabled', 'archived')),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nexus_agent_config_revisions (
    id          TEXT PRIMARY KEY,
    agent_id    TEXT NOT NULL REFERENCES nexus_agent_configs(id),
    version     INTEGER NOT NULL,
    profile_hash TEXT NOT NULL,
    profile_data JSONB NOT NULL,
    changed_by  TEXT DEFAULT '',
    change_note TEXT DEFAULT '',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(agent_id, version)
);

CREATE INDEX IF NOT EXISTS idx_nexus_agents_slug ON nexus_agent_configs(slug);
CREATE INDEX IF NOT EXISTS idx_nexus_agents_status ON nexus_agent_configs(status);
CREATE INDEX IF NOT EXISTS idx_nexus_revisions_agent ON nexus_agent_config_revisions(agent_id, version DESC);
