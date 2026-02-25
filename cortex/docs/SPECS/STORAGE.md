# Storage Spec

Status: pivot-aligned draft (Task 4)

## Storage architecture
Hybrid local storage:
- append-only file-backed records (canonical payloads)
- SQLite metadata index (heads + deterministic selectors)

## Canonical entities
1. `record`
- immutable revision event
- includes namespace, key, revision, actor, timestamp, payload pointer

2. `head`
- current revision pointer for `(namespace,key)`

3. `selector` (stored definition, optional in MVP)
- deterministic query definition for views

## Logical schema (SQLite)
- `records(record_id, namespace, key, revision, actor, created_at, checksum, file_path)`
- `heads(namespace, key, head_revision, head_record_id, updated_at)`
- `namespaces(namespace, owner_type, owner_id, policy_json)`

## Filesystem layout (logical)
- `data/records/<namespace>/<key>/<revision>.json`
- `data/index/context.db`

## Consistency rules
- Write transaction succeeds only if both record persistence and index/head updates succeed.
- Head must always reference an existing record row.
- Missing payload file for indexed row is a consistency fault.

## Permission and ownership
- `user/*`: protected namespace; requires explicit promotion/approval flow for writes originating outside user authority.
- `app/<client-id>/*`: owned by specific client id.
- Cross-namespace writes require explicit policy grants (default deny).

## Namespace schema contracts
- Namespace policy may define payload contract metadata.
- MVP supported schema rule:
  - `required_keys`: array of required top-level JSON object keys.
- When configured, write/promote operations must satisfy the rule or fail with deterministic validation errors.

## Policy schema evolution options

Option A: namespace-level policy only (current baseline)
- Pros:
  - Simpler policy evaluation and lower operational complexity.
  - Aligns directly with current actor/namespace matrix semantics.
- Cons:
  - Coarse-grained controls when different keys in one namespace need different constraints.

Option B: namespace + per-key policy overlays (future option)
- Pros:
  - Finer-grained authorization and schema constraints per key.
  - Better fit for mixed-sensitivity data within a shared namespace.
- Cons:
  - Higher policy complexity and migration/test burden.
  - Greater risk of conflicting rules if precedence is not explicit.

Compatibility guidance:
- Start with namespace-level defaults, then add per-key overlays as additive policy fields.
- Preserve existing behavior when per-key overlays are absent.
- Treat precedence changes as contract-level updates requiring API/CLI docs and migration notes.

## Deterministic read constraints
- History ordering: ascending `revision`.
- Head resolution: single row in `heads`.
- Selector results: stable explicit sort key sequence, default `(namespace,key,revision)`.

## Retention baseline proposal (local-first default)

Recommended default baseline:
- Keep latest `20` revisions per `(namespace,key)` during compaction.
- Keep latest `10,000` audit events globally.
- Run compaction as an explicit maintenance action (not on every write path).

Rationale:
- Traceability: retaining multiple revisions preserves operator/debug context and promotion provenance.
- Storage growth control: bounded revision/audit windows prevent unbounded local disk growth.
- Determinism: compaction trims only older history while preserving current heads and stable read ordering.

Compaction linkage:
- Runtime/CLI compaction should preserve head invariants and deterministic selector behavior.
- Baseline values should be treated as defaults; operators may increase/decrease based on local retention requirements.
