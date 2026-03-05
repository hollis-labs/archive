---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Backlog & Priorities

## Task inventory

20 tasks under `.volon/tasks/` (TASK-20260225-001 through TASK-20260225-020).
9 backlog items under `.volon/backlog/` (BACKLOG-20260226-001 through BACKLOG-20260228-001).

## Current priorities (from codebase signals)

1. **MCP adapter completion** -- `internal/mcpadapter/` exists with adapter, tools, and tests; maps tool calls to context operations per `docs/SPECS/MCP.md`
2. **Web UI** -- `internal/webui/` package exists; likely early-stage dashboard for context browsing
3. **View evaluator** -- deterministic selector-based reads documented in architecture but implementation status unclear
4. **Contract test hardening** -- extensive golden fixture infrastructure with 40+ contract suites; ongoing expansion

## Active areas

- Contract-driven API development (golden fixture methodology)
- Auth lifecycle (managed tokens with issue/rotate/revoke)
- Audit and observability (metrics endpoint, request logging, correlation)
- Consistency operations (doctor scan, head repair)
- Retention and compaction

## Known gaps

- Web UI (in progress, not shipped)
- MCP adapter (in progress per `docs/SPECS/MCP.md`)
- Cloud sync explicitly out of scope
- No semantic merging (by design)

## Architectural decisions on record

- ADR-0001: Storage and namespaces
- ADR-0002: Generalized context registry

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: .volon/tasks/, .volon/backlog/, docs/DECISIONS/ADR-INDEX.md, docs/ARCHITECTURE.md, internal/
