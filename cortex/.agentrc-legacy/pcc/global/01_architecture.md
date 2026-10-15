---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Architecture

## Tech stack

- **Language:** Go 1.25
- **Module:** `github.com/hollis-labs/volon-dev` (shared module path with volon-dev)
- **Dependencies:** yaml.v3, modernc.org/sqlite, mcp-go
- **Storage:** SQLite index + file-based append-only record store

## Core model

- **Record log:** append-only revisions per `(namespace, key)`
- **Heads table:** authoritative current head per `(namespace, key)`
- **Views:** deterministic selectors over indexed metadata with optional payload fetch

## Components

### CLI/Server (`cmd/contextd`)
Single binary. Subcommands: `serve`, `context put/get/head/history/view`, `context audit`, `context token`, `context namespace`, `context doctor/repair-heads`, `context backup`, `context compact`, `context bootstrap`, `context contract`, `context health`.

### Internal packages (`internal/`)
- `contextstore` -- SQLite-backed record/head/audit storage with append-only writes
- `contextapi` -- HTTP API server (broker, packet, promote handlers)
- `contextpolicy` -- namespace ownership and promotion policy enforcement
- `contextcli` -- CLI command implementations
- `mcpadapter` -- MCP server adapter mapping tool calls to context operations
- `taskscli` -- Volon task operations
- `webui` -- web UI (planned/in progress)

## Data flow

1. **Write:** validate actor + namespace policy, allocate revision, persist record (append-only), upsert index + advance head atomically, return provenance
2. **Read:** resolve operation (head/history/view), query index with stable ordering, read payloads, return deterministic envelope
3. **Promote:** copy record from app namespace to protected `user/*` namespace with audit trail

## Key invariants

- Append-only records; no in-place payload mutation
- Single head per `(namespace, key)`
- Deterministic ordering for identical selectors and store state

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: docs/ARCHITECTURE.md, docs/SCOPE.md, internal/, cmd/contextd/
