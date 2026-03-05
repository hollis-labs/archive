---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Conventions

## Coding standards

- Go standard library style; `go vet` for linting
- Pure Go SQLite (`modernc.org/sqlite`) -- no CGo
- Contract-driven development: golden JSON fixtures under `tests/integration/fixtures/`
- All API contract changes require intentional fixture updates with rationale in commit message
- Specs in `docs/SPECS/`, decisions in `docs/DECISIONS/` with ADR index

## Branching and git

- Worktrees enabled (`git.use_worktrees: true`, root: `.worktrees/`)
- Branch prefix: `volon/`
- PR mode: optional
- Commit policy: per-iteration

## Naming conventions

- Task IDs: `TASK-YYYYMMDD-NNN`
- Backlog IDs: `BACKLOG-YYYYMMDD-NNN`
- ADR format: `ADR-NNNN-<slug>.md` in `docs/DECISIONS/`
- Spec files: `docs/SPECS/<TOPIC>.md` (e.g., API.md, CLI.md, MCP.md, STORAGE.md)
- Contract fixtures: `tests/integration/fixtures/<name>_contract_golden.json`

## Test commands

```bash
go test ./...                        # all tests
go test ./tests/integration -run AuthGate  # targeted integration
make test                            # all tests via make
make contracts                       # contract suites only
make smoke BASE_URL=... TOKEN=...    # smoke tests against running server
make e2e-local                       # full local harness
make e2e-managed                     # managed-auth preset
make contract-lint                   # fixture presence lint
make agents-boot-check               # AGENTS boot drift check
```

## Auth conventions

- Tokens never committed to repo
- Prefer `export CONTEXTD_TOKEN=...` or untracked env file
- Rotate after sharing events; revoke obsolete tokens

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: docs/DEV.md, volon.yaml, Makefile, docs/CONTRACT_FIXTURES.md
