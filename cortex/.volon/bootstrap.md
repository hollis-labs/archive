---
version: 1
type: bootstrap
iteration: 192
updated_at: 2026-02-27T22:00:00Z
config:
  path: volon.yaml
  storage_backend: files
  pcc_path: .volon/pcc
  tasks_path: .volon/tasks
  logs_path: .volon/logs
execution:
  driver: tasks
  max_tasks_per_run: 6
  completion_token: DONE
---

# Volon Bootstrap

## What to do next
- MCP extension done (6ffdd96): 8 new tools (promote, broker, namespace, audit). Docs updated.
- Human docs updated (55aeb6f): QUICKSTART §10 expanded, CONTEXT-FOR-PROJECTS.md created.
- Release sprint created (sprint-release-v1): 15 tasks, TASK-20260301-001..015.
- **HOLD** — user testing weekend in progress. Do not start release tasks until testing complete
  and rename decision made (TASK-20260301-001 is the gate for the whole sprint).
- GUI sprint (TASK-20260225-239..242, TASK-20260228-001..004) remains deferred.

## MVP Sprint Plan (re-focused 2026-02-27, audited 2026-02-27)
Evaluation spec at `SPEC-TASKS/Context Memory Service Evaluation/` is authoritative.
GUI is post-MVP. MVP = CLI only. API/MCP/GUI are all post-MVP surfaces.
Plan: `artifacts/plan/mvp-replan-2026-02-27.md`

## Current state summary
- PCC: present
- Tasks: 15 todo (release sprint), 0 blocked-active, 254+ done (5 cancelled, 8 deferred: GUI)
- Cancelled: TASK-20260227-019..020 (superseded by 020..022)
- Deferred: TASK-20260225-239..242 + TASK-20260228-001..004 (GUI only)
- Backlog: BACKLOG-20260228-001 done (user/agent docs — completed iteration 192)
- Last run log: `.volon/logs/run-iteration-192-2026-02-27.md`
- Release plan: `artifacts/plan/release-sprint-plan.md`

## Active work (MVP sprints in priority order)
### sprint-2026-04-eval-phase0 — Spec alignment (START HERE)
- TASK-20260228-005 — Close tags_any spec/impl mismatch (A) ✓ done
- TASK-20260228-006 — Implement records.checksum on write + scan validation (A) ← NEXT

### sprint-2026-05-eval-phase1 — Tiered namespaces
- TASK-20260228-007 — Define canonical tiered namespace conventions + defaults (A)
- TASK-20260228-008 — Extend namespace policy schema with tier enforcement (A)
- TASK-20260228-009 — Add store-level maintenance jobs: trim/compact/tombstone (B)

### sprint-2026-06-eval-phase2 — Context packets
- TASK-20260228-010 — POST /v1/context/packet endpoint (A)
- TASK-20260228-011 — Deterministic byte/token budget estimation (B)
- TASK-20260228-012 — Tag indexing in SQLite (B, conditional on 005 decision)

### sprint-2026-07-eval-phase3 — Gated promotion
- TASK-20260228-013 — Define promote.request + promote.approve record types (A)
- TASK-20260228-014 — Implement request/approve/apply promotion lifecycle (A)

### sprint-2026-08-eval-phase4 — Capability tokens
- TASK-20260228-015 — Extend auth_tokens with client_id, scopes, namespace_globs (A)
- TASK-20260228-016 — Enforce capability token claims in all mutating handlers (A)

### sprint-2026-09-eval-phase5 — Broker agent
- TASK-20260228-017 — POST /v1/broker/plan endpoint + context broker CLI commands (B)
- TASK-20260228-018 — Strict broker plan validation (B)

### sprint-2026-10-mvp-verify — MVP verification gate (run after all phases complete)
- TASK-20260228-019 — MVP end-to-end verification: full agent workflow via CLI (A)

### sprint-post-mvp-mcp — ACTIVE
Plan: `artifacts/plan/mcp-sprint-plan-2026-02-27.md`
- TASK-20260228-020 — MCP adapter foundation: stdio transport, Store wiring, --mcp flag (A) ← START
- TASK-20260228-021 — MCP read tools: context_head, context_history, context_view (A)
- TASK-20260228-022 — MCP write + packet + promote tools (A)
- TASK-20260227-019 — cancelled (superseded by 020)
- TASK-20260227-020 — cancelled (superseded by 022)

### sprint-release-v1 — HOLD (start after user testing + rename decision)
Plan: `artifacts/plan/release-sprint-plan.md`
- TASK-20260301-001 — Name + branding decision (A) ← GATE — start here
- TASK-20260301-002 — Define public export scope (A)
- TASK-20260301-003 — License decision + LICENSE file (A)
- TASK-20260301-004 — Go module rename (A, needs 001)
- TASK-20260301-005 — Create new public repo + initial export (A, needs 001-004)
- TASK-20260301-006 — Write root README for public repo (A, needs 005)
- TASK-20260301-007 — Add CONTRIBUTING.md + CODE_OF_CONDUCT.md (B, needs 005)
- TASK-20260301-008 — Docs audit + update all refs for new name (A, needs 001+005)
- TASK-20260301-009 — Write HTTP API reference doc (B, needs 005)
- TASK-20260301-010 — Write CHANGELOG + v0.1.0 release notes (B, needs 005)
- TASK-20260301-011 — GitHub repo configuration (A, needs 001+005)
- TASK-20260301-012 — GitHub Actions CI pipeline (A, needs 005)
- TASK-20260301-013 — GitHub issue + PR templates (C, needs 005)
- TASK-20260301-014 — Review + adapt mini-site for public release (A, needs 001)
- TASK-20260301-015 — Domain registration + site deploy (A, needs 001+014)

### sprint-post-mvp-gui — Deferred (do not start until MVP complete)
- TASK-20260225-239 through 242, TASK-20260228-001 through 004 (8 tasks, all deferred)

### Blockers
- Volon CLI executable (`volon`) not found in PATH; lifecycle transitions continue via markdown task state.

## Guardrails
- Treat repository files as ground truth. Do not rely on chat memory.
- Minimal diffs; small verifiable steps.
- Update tasks + write a run log per loop invocation.

## Evidence pointers
- Last implementation commit: `6ffdd96` (8 new MCP tools: promote/broker/namespace/audit)
- Last docs commit: `55aeb6f` (QUICKSTART §10, CONTEXT-FOR-PROJECTS.md)
- Release plan: `artifacts/plan/release-sprint-plan.md`
- API baseline: `internal/contextapi/`
- CLI baseline: `internal/contextcli/`
- MCP baseline: `internal/mcpadapter/` (14 tools)
- Mini-site baseline: `user-docs-mini-site/` (5 pages, needs review for release)
