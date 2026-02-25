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

## Threat assumptions and trust boundaries

Deployment assumptions:
- Default target is local-first usage on a trusted developer machine.
- Shared-host or multi-user environments are treated as higher-risk and should enable stricter auth modes.

Trust boundary model:
- MCP client process boundary: requests may originate from tools with varying trust levels.
- Adapter boundary: must enforce core API/CLI policy semantics; it is not an authorization bypass.
- Core service boundary: remains the source of truth for auth, namespace ownership, and deterministic validation.

Risk notes by environment:
- Local-only host:
  - Primary risk is accidental overexposure of mutating tools.
  - Mitigation: keep write/promote tools explicit and auditable.
- Shared host / team workstation:
  - Elevated risk of unauthorized read/write access through exposed MCP surfaces.
  - Mitigation: prefer gated read mode or strict-auth-all mode, restrict mutating capabilities to trusted operators.

Alignment requirements:
- Follow API auth roadmap (`mvp-open-read`, `optional-gated-read`, `strict-auth-all`) from `docs/SPECS/API.md`.
- Preserve actor/namespace policy guarantees for all mutating operations.
- Keep selector operations evaluator-only; no hidden processor/synthesis behavior.

## Phased capability model

| Phase | Allowed operations | Auth/policy expectations | Risk controls |
|---|---|---|---|
| `phase-1-read-view` | `head`, `history`, `views/evaluate` | Follows API read/view mode (`mvp-open-read` by default, optional gated modes later). | Keep adapter side-effect free for read/view and enforce deterministic ordering parity with API/CLI. |
| `phase-2-namespace-admin` | `namespaces/register`, `namespaces/get` | Mutating calls require auth per server mode and must respect ownership schema validation. | Restrict to explicit admin/tool contexts; audit every mutation path. |
| `phase-3-write-promote` | `context/write`, `context/promote` | Write requires namespace ownership grants; promote requires user actor semantics and protected `user/*` policy. | Enforce actor/namespace matrix, deterministic error envelopes, and explicit promote approval flow. |

Phase progression constraints:
- Each phase must be releasable without changing deterministic behavior in prior phases.
- Selector semantics remain evaluator-only in all phases (no processor behavior).
- Capability expansion requires corresponding API/CLI contract documentation updates.
- Selector capability discovery/negotiation follows `docs/SPECS/VIEWS.md#selector-capability-discovery-model`.

## References
- API spec: [`docs/SPECS/API.md`](./API.md)
- CLI spec: [`docs/SPECS/CLI.md`](./CLI.md)
- Views spec: [`docs/SPECS/VIEWS.md`](./VIEWS.md)
- Architecture: [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
- ADR-0002 pivot: [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md)
