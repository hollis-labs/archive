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

### Phase-to-tool exposure matrix

| Phase | Tool surface | Default posture | Enablement rule |
|---|---|---|---|
| `phase-1-read-view` | `head`, `history`, `views/evaluate` | Default-enabled | Keep enabled by default while preserving deterministic read/view parity with API/CLI. |
| `phase-2-namespace-admin` | `namespaces/get` | Explicitly-enabled | Enable for operators who need policy inspection in shared/team environments. |
| `phase-2-namespace-admin` | `namespaces/register` | Explicitly-enabled (mutating) | Enable only for trusted admin identities after `phase-1 -> phase-2` gate criteria are met. |
| `phase-3-write-promote` | `context/write` | Explicitly-enabled (mutating) | Enable only after actor/namespace policy checks and mutate token flow verification pass. |
| `phase-3-write-promote` | `context/promote` | Explicitly-enabled (mutating) | Enable only when protected `user/*` promote semantics (`actor=user`) and audit visibility are verified. |

Exposure guidance:
- Keep mutating tool surfaces opt-in even after phase promotion; do not auto-enable in broad/shared operator contexts.
- Validate explicit enablement decisions against phase gate criteria and environment adoption recommendations before widening access.

Phase progression constraints:
- Each phase must be releasable without changing deterministic behavior in prior phases.
- Selector semantics remain evaluator-only in all phases (no processor behavior).
- Capability expansion requires corresponding API/CLI contract documentation updates.
- Selector capability discovery/negotiation follows `docs/SPECS/VIEWS.md#selector-capability-discovery-model`.

## Phase gate criteria

Minimum criteria before promoting from one MCP phase to the next:

| Gate transition | Auth readiness minimum | Policy check minimum | Observability readiness minimum |
|---|---|---|---|
| `phase-1-read-view` -> `phase-2-namespace-admin` | Mutating token enforcement validated end-to-end for namespace admin calls. | Namespace registration/get flows verified against API/CLI contract behavior. | Namespace mutation events are traceable in audit surfaces with operator attribution. |
| `phase-2-namespace-admin` -> `phase-3-write-promote` | Token propagation validated for `write` and `promote` tool paths in target environment mode. | Actor/namespace matrix checks pass, including protected `user/*` promote semantics (`actor=user`). | Write/promote outcomes and failures (`auth_required`, `policy_denied`, `validation_error`) are observable and actionable in operator runbooks. |
| Any phase promotion in team-managed environments | Auth mode aligned to environment guidance (`strict-auth-all` preferred for team-managed). | Preflight actor/policy checks completed for newly enabled mutate capabilities. | Rollout includes explicit rollback trigger and audit verification before widening access. |

Gate alignment notes:
- Apply these criteria together with the `Preflight checklist (team-managed / production-like)` before enabling new mutate capabilities.
- Phase sequencing should follow `Environment-based phase adoption recommendations` so auth posture and risk controls stay aligned.

## Phase promotion evidence checklist

Capture this evidence before approving a phase transition:
1. Auth validation proof:
   - Record token enforcement results for the target phase tool surfaces in active environment mode.
   - Include at least one successful authenticated flow and one expected `auth_required` failure case.
2. Policy verification proof:
   - Record actor/namespace policy checks for newly enabled mutating tools.
   - Include evidence that protected `user/*` promote semantics (`actor=user`) are enforced where applicable.
3. Observability proof:
   - Capture audit/trace evidence for representative success and failure paths.
   - Ensure `auth_required`, `policy_denied`, and `validation_error` outcomes are visible and actionable in operator workflows.
4. Rollout control proof:
   - Document rollback trigger and rollback owner for the promotion window.
   - Confirm phase-to-tool exposure decisions match explicit enablement posture in this spec.

Evidence handling notes:
- Store promotion evidence with release/change artifacts so approvals are reproducible.
- Treat missing evidence in any category as a no-go for phase promotion.

## Phase rollback-readiness checklist

Complete this before enabling new mutating MCP capabilities:
1. Rollback trigger:
   - Define explicit rollback conditions (for example: repeated `auth_required` failures under validated token flow, policy invariant violations, or audit visibility gaps).
2. Rollback owner:
   - Assign a named operator/team responsible for executing rollback and validating post-rollback state.
3. Verification scope:
   - Identify the minimum verification set to run after rollback (tool exposure state, auth mode expectations, policy enforcement, audit visibility).
4. Communication expectations:
   - Define who receives rollback notices and where status updates are posted during the rollback window.
5. Post-rollback confirmation:
   - Confirm system returns to previously approved phase behavior and update promotion evidence artifacts with rollback outcome notes.

Rollback alignment notes:
- Keep rollback checklist decisions consistent with `Phase gate criteria` and `Phase promotion evidence checklist`.
- Do not advance phase rollout when rollback trigger/owner/scope are undefined.

## Phase promotion sign-off template

Use this template when approving a phase transition:
- `Phase transition:` `<from_phase> -> <to_phase>`
- `Approver:` `<name/team>`
- `Date:` `YYYY-MM-DD`
- `Gate criteria status:` `pass|fail` (reference `Phase gate criteria`)
- `Evidence checklist status:` `pass|fail` (reference `Phase promotion evidence checklist`)
- `Rollback readiness status:` `pass|fail` (reference `Phase rollback-readiness checklist`)
- `Tool exposure decision:` `<enabled surfaces + scope>`
- `Approval note:` `<brief rationale + constraints>`

Sign-off rule:
- Any `fail` status blocks promotion approval until remediated and re-verified.

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

## Error-to-action matrix

| Error class | Typical MCP phase context | First response action |
|---|---|---|
| `auth_required` | Any phase when endpoint/mode requires token | Verify auth mode expectations, then confirm bearer token propagation and token lifecycle status. |
| `policy_denied` | `phase-2`/`phase-3` mutate paths | Re-check actor-to-namespace mapping and policy grants, especially protected `user/*` promote constraints. |
| `validation_error` | Selector evaluation or malformed mutate payload | Normalize payload/selector shape to documented schema and remove unsupported fields. |

## Environment-based phase adoption recommendations

| Environment | Recommended phase adoption | Suggested auth mode | Risk posture guidance |
|---|---|---|---|
| Single-user local workstation | `phase-1` -> `phase-2` -> `phase-3` as needed | `mvp-open-read` acceptable; mutate paths still token-gated | Lower risk; prioritize operator ergonomics while keeping mutate actions explicit and audited. |
| Shared workstation | Start with `phase-1`; adopt `phase-2/3` only for trusted operators | `optional-gated-read` minimum | Medium risk; reduce accidental data exposure and require explicit token flow for shared contexts. |
| Team-managed environment | Start with constrained `phase-1`, then staged rollout to `phase-2/3` with approvals | `strict-auth-all` preferred | Higher risk; enforce strong auth posture, ownership policy checks, and auditability before enabling mutating tools. |

## Preflight checklist (team-managed / production-like)

Before enabling `phase-2` or `phase-3` MCP capabilities:
1. Auth mode confirmation:
   - Verify active mode is consistent with team policy (`strict-auth-all` recommended).
2. Token flow validation:
   - Confirm bearer token propagation from MCP client through adapter boundary to API calls.
   - Validate token lifecycle status (active/non-revoked) for operational identities.
3. Actor/policy checks:
   - Validate actor mapping for mutate tools.
   - Confirm promote paths enforce `actor=user` for protected `user/*` transitions.
4. Audit visibility:
   - Verify mutate actions appear in audit query surfaces and can be traced by operator.
5. Rollout guard:
   - Enable capabilities phase-by-phase with rollback path if auth/policy invariants fail.

## References
- API spec: [`docs/SPECS/API.md`](./API.md)
- CLI spec: [`docs/SPECS/CLI.md`](./CLI.md)
- Views spec: [`docs/SPECS/VIEWS.md`](./VIEWS.md)
- Architecture: [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
- ADR-0002 pivot: [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md)
