# Context Memory Service Architecture

Status: pivot-aligned draft (Task 4)

## Architecture intent
Provide deterministic context persistence/retrieval for multiple local clients while preserving strict namespace ownership and auditable history.

## Core model
- Record log: append-only revisions per `(namespace,key)`.
- Heads table: authoritative current head per `(namespace,key)`.
- Views: deterministic selectors over indexed metadata and optional payload fetch.

## Components
1. File record store
- Stores append-only payload records.
- Canonical payload source for every revision.

2. SQLite index
- Indexes record metadata and heads.
- Supports deterministic query ordering and bounded scans.

3. Policy engine
- Enforces namespace ownership and protected `user/*` semantics.
- Validates promotion workflow constraints.

4. Interface adapters
- HTTP API and CLI adapters share the same core service operations.
- MCP adapter (planned) maps tool calls to identical contracts.

5. View evaluator
- Parses selector definitions.
- Resolves deterministic result sets (selectors only, no processors).

## Write lifecycle
1. Validate actor + namespace policy.
2. Allocate next revision for `(namespace,key)`.
3. Persist record file append-only.
4. Upsert index row and advance head atomically.
5. Return new head metadata with provenance.

## Read lifecycle
1. Resolve operation (`head`, `history`, `view`).
2. Query index with stable ordering rules.
3. Read payloads for selected revisions.
4. Return deterministic envelope.

## Invariants
- Append-only records; no in-place payload mutation.
- Single head per `(namespace,key)`.
- Deterministic ordering for identical selectors and store state.
- Service complements PCC; does not replace `.volon/pcc/*` as orchestrator ground truth.
