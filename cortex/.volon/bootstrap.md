---
version: 1
type: bootstrap
iteration: 84
updated_at: 2026-02-25T20:58:00Z
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
- Start `TASK-20260225-155` to add API selector validation error map.

## Current state summary
- volon.yaml: present
- PCC: present
- Tasks: 4 todo, 0 blocked, 154 done
- Last run log: `.volon/logs/run-iteration-083-2026-02-25.md`

## Active work
### Highest priority todos
- TASK-20260225-155 — Add API selector validation error map (A)
- TASK-20260225-156 — Add VIEWS compatibility examples for additive fields (B)
- TASK-20260225-157 — Add MCP error-to-action matrix (B)
- TASK-20260225-158 — Add outputs README maintenance checklist (B)

### Blockers
- Volon CLI executable (`volon`) not found in PATH; lifecycle transitions continue via markdown task state.

## Guardrails
- Treat repository files as ground truth. Do not rely on chat memory.
- Minimal diffs; small verifiable steps.
- Update tasks + write a run log per loop invocation.

## Evidence pointers
- Last implementation commit: `1e3dc26`
- API baseline: `internal/contextapi/`
- CLI baseline: `internal/contextcli/`
