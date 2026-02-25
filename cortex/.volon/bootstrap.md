---
version: 1
type: bootstrap
iteration: 54
updated_at: 2026-02-25T18:36:00Z
config:
  path: volon.yaml
  storage_backend: nanite
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
- Start `TASK-20260225-131` to define selector capability discovery for extensions.

## Current state summary
- volon.yaml: present
- PCC: present
- Tasks: 4 todo, 0 blocked, 130 done
- Last run log: `.volon/logs/run-iteration-053-2026-02-25.md`

## Active work
### Highest priority todos
- TASK-20260225-131 — Add selector capability-negotiation note for MCP and API (A)
- TASK-20260225-132 — Document policy schema evolution options (B)
- TASK-20260225-133 — Add operational profile examples for compaction defaults (B)
- TASK-20260225-134 — Create pivot docs index for generated output artifacts (B)

### Blockers
- Volon CLI executable (`volon`) not found in PATH; lifecycle transitions continue via markdown task state.

## Guardrails
- Treat repository files as ground truth. Do not rely on chat memory.
- Minimal diffs; small verifiable steps.
- Update tasks + write a run log per loop invocation.

## Evidence pointers
- Last implementation commit: `e686251`
- API baseline: `internal/contextapi/`
- CLI baseline: `internal/contextcli/`
