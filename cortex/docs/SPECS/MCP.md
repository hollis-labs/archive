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

## Operator enablement checklist

Phase 1 (`read-view`) checklist:
1. Confirm intended auth mode in API roadmap (`mvp-open-read` or gated variants).
2. Expose only read/view MCP tools (`head`, `history`, `views/evaluate`).
3. Verify deterministic ordering parity with API/CLI for identical selector inputs.
4. Validate unknown selector fields fail with `validation_error`.

Phase 2 (`namespace-admin`) checklist:
1. Enable mutating namespace tools only for trusted operators.
2. Verify bearer-token enforcement for mutating calls.
3. Validate namespace policy registration/get flows mirror CLI/API behavior.
4. Confirm admin actions are auditable.

Phase 3 (`write-promote`) checklist:
1. Enable `write`/`promote` tools only after policy matrix review.
2. Verify actor constraints (`promote` requires user actor).
3. Validate protected `user/*` behavior and deterministic error envelopes.
4. Run end-to-end register/write/promote/audit verification flow before rollout.

## Troubleshooting quick-reference

| Symptom | Likely cause | Operator action |
|---|---|---|
| Read/view MCP calls fail with `auth_required` unexpectedly | Server running in `optional-gated-read` or `strict-auth-all` mode without token injection | Provide bearer token in MCP call path and verify active auth mode in API roadmap section. |
| Selector evaluation returns `validation_error` for unknown field | Client sent selector field not in supported capability set | Remove unsupported field, align with `docs/SPECS/VIEWS.md`, and confirm capability discovery guidance. |
| Write or promote returns `policy_denied` | Actor/namespace combination violates ownership matrix | Re-check actor identity and namespace policy; confirm promote uses `actor=user` for protected `user/*` targets. |
| Promote succeeds in CLI but fails in MCP | MCP tool mapping omitted required promote fields or actor propagation | Compare MCP payload mapping to API/CLI contract fields and ensure full parity for `from_*`/`to_*`/actor parameters. |

## References
- API spec: [`docs/SPECS/API.md`](./API.md)
- CLI spec: [`docs/SPECS/CLI.md`](./CLI.md)
- Views spec: [`docs/SPECS/VIEWS.md`](./VIEWS.md)
- Architecture: [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
- ADR-0002 pivot: [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md)
