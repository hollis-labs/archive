# MCP Adapter Spec

Status: planned (pivot follow-up)

## Purpose
Define the MCP adapter as a thin transport mapping to existing Context Memory Service contracts.

## Scope
- Provide MCP-accessible operations that map directly to API/CLI behavior.
- Preserve namespace ownership, deterministic ordering, and audit semantics.
- Avoid introducing parallel state models or MCP-specific business rules.

## Non-goals
- No processor semantics in view operations (selectors only).
- No hidden data synthesis/merging beyond existing core contracts.
- No alternate persistence path outside the existing store/index model.

## Contract mapping
- Namespace policy:
  - maps to `POST /v1/namespaces/register` and CLI `context namespace register`
- Write/read:
  - maps to `POST /v1/context/write`, `GET /v1/context/head`, `GET /v1/context/history`
- Promote:
  - maps to `POST /v1/context/promote` with explicit user actor constraints
- View evaluation:
  - maps to `POST /v1/views/evaluate` / CLI `context view`

## Determinism constraints
- Result ordering must match API/CLI determinism guarantees.
- Selector fallback ordering remains `(namespace,key,revision)`.
- Limit truncation occurs after deterministic sort.
- MCP adapter must remain side-effect free for read/view operations.

## Policy and auth notes
- Mutating operations follow server auth policy exactly as API path.
- Namespace ownership policy remains authoritative.
- Protected `user/*` updates continue to require explicit user promotion semantics.

## References
- API spec: [`docs/SPECS/API.md`](./API.md)
- CLI spec: [`docs/SPECS/CLI.md`](./CLI.md)
- Views spec: [`docs/SPECS/VIEWS.md`](./VIEWS.md)
- Architecture: [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
- ADR-0002 pivot: [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md)
