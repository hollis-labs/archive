---
version: 1
type: bootstrap
iteration: 188
updated_at: 2026-02-27T12:00:00Z
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
- Start `TASK-20260228-005` (sprint-2026-04-eval-phase0): close tags_any spec/impl mismatch — choose Option A (remove from spec) then move to task 006.
- Then `TASK-20260228-006`: implement records.checksum on write (one-line fix in store.go:389, plus scan validation).

## MVP Sprint Plan (re-focused 2026-02-27, audited 2026-02-27)
Evaluation spec at `SPEC-TASKS/Context Memory Service Evaluation/` is authoritative.
GUI is post-MVP. MVP = CLI only. API/MCP/GUI are all post-MVP surfaces.
Plan: `artifacts/plan/mvp-replan-2026-02-27.md`

## Current state summary
- PCC: present
- Tasks: 15 todo, 0 blocked, 235 done (3 cancelled, 10 deferred: 8 GUI + 2 MCP)
- Active todo series: TASK-20260228-005 through TASK-20260228-019 (no duplicates, all in-sprint)
- Deferred: TASK-20260225-239..242 + TASK-20260228-001..004 (GUI); TASK-20260227-019..020 (MCP)
- Last run log: `.volon/logs/run-iteration-186-2026-02-26.md`
- Replan log: `artifacts/plan/mvp-replan-2026-02-27.md`

## Active work (MVP sprints in priority order)
### sprint-2026-04-eval-phase0 — Spec alignment (START HERE)
- TASK-20260228-005 — Close tags_any spec/impl mismatch (A) ← NEXT
- TASK-20260228-006 — Implement records.checksum on write + scan validation (A)

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

### sprint-post-mvp-mcp — Deferred (do not start until MVP CLI is complete)
- TASK-20260227-019 — MCP adapter phase-1: read/view tools (deferred)
- TASK-20260227-020 — MCP adapter phase-2+3: write/packet/promote tools (deferred)

### sprint-post-mvp-gui — Deferred (do not start until MVP complete)
- TASK-20260225-239 through 242, TASK-20260228-001 through 004 (8 tasks, all deferred)

### Blockers
- Volon CLI executable (`volon`) not found in PATH; lifecycle transitions continue via markdown task state.

## Guardrails
- Treat repository files as ground truth. Do not rely on chat memory.
- Minimal diffs; small verifiable steps.
- Update tasks + write a run log per loop invocation.

## Evidence pointers
- Last implementation commit: `fb69f9a`
- API baseline: `internal/contextapi/`
- CLI baseline: `internal/contextcli/`
