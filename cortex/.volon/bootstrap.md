---
version: 1
type: bootstrap
iteration: 32
updated_at: 2026-02-25T21:00:00Z
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
- Start `TASK-20260225-101` to document default-vs-table contract CLI quick reference.

## Current state summary
- volon.yaml: present
- PCC: present
- Tasks: 2 todo, 0 blocked, 100 done
- Last run log: `.volon/logs/run-iteration-025-2026-02-25.md`

## Active work
### Highest priority todos
- TASK-20260225-101 — Document contract CLI default vs table output quick reference (B)
- TASK-20260225-102 — Add regression test for contract-suite-commands deterministic ordering (B)

### Blockers
- Volon CLI executable (`volon`) not found in PATH; lifecycle transitions continue via markdown task state.

## Guardrails
- Treat repository files as ground truth. Do not rely on chat memory.
- Minimal diffs; small verifiable steps.
- Update tasks + write a run log per loop invocation.

## Evidence pointers
- Last implementation commit: `2ec6c9d`
- API baseline: `internal/contextapi/`
- CLI baseline: `internal/contextcli/`
