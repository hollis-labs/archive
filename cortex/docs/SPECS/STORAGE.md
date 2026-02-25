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

## Deterministic read constraints
- History ordering: ascending `revision`.
- Head resolution: single row in `heads`.
- Selector results: stable explicit sort key sequence, default `(namespace,key,revision)`.
