-- Nexus A2A messaging table
-- Used by hollis-labs/nexus messaging package

CREATE TABLE IF NOT EXISTS nexus_messages (
    id          TEXT PRIMARY KEY,
    from_agent  TEXT NOT NULL,
    to_agent    TEXT NOT NULL,
    thread_id   TEXT NOT NULL,
    reply_to    TEXT REFERENCES nexus_messages(id),
    type        TEXT NOT NULL DEFAULT 'message'
                CHECK(type IN ('message', 'help_request', 'directive', 'status_update', 'handoff')),
    subject     TEXT,
    body        TEXT NOT NULL,
    metadata    JSONB DEFAULT '{}',
    priority    INTEGER DEFAULT 2,
    status      TEXT DEFAULT 'unread'
                CHECK(status IN ('unread', 'read', 'acknowledged', 'resolved')),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    read_at     TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_nexus_inbox ON nexus_messages(to_agent, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_nexus_thread ON nexus_messages(thread_id, created_at);
CREATE INDEX IF NOT EXISTS idx_nexus_from ON nexus_messages(from_agent, created_at DESC);
