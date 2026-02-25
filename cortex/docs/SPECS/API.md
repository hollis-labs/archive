# HTTP API Spec

Status: pivot-aligned draft (Task 5)

## Conventions
- Base path: `/v1`
- JSON request/response
- Deterministic ordering for all collection responses
- Error shape:
  - `code` (string)
  - `message` (string)
- `details` (object, optional)

Common error codes:
- `validation_error` (`400`)
- `policy_denied` (`403`)
- `auth_required` (`401`)
- `not_found` (`404`)

## Local auth posture (MVP)
- Mechanism: bearer token in `Authorization` header.
- Scope: mutating endpoints (`POST /v1/namespaces/register`, `POST /v1/context/write`, `POST /v1/context/promote`).
- Behavior:
  - Legacy mode: when static server auth token is configured, mutating requests without a matching bearer token return `401`.
  - Managed mode: token lifecycle is store-backed (issue/rotate/revoke/expiry). Revoked/expired tokens are rejected with `401`.
  - Read endpoints (`head`, `history`, `views/evaluate`) remain side-effect free and do not require auth in MVP.
- Error envelope for auth failures:
  - `code: "auth_required"`
  - `message: "missing or invalid bearer token"`

### Post-MVP read/view auth roadmap

Mode options under evaluation:
1. `mvp-open-read`:
   - `head`, `history`, `views/evaluate` remain unauthenticated.
   - Backward compatible with current local-first defaults.
2. `optional-gated-read`:
   - server flag enables bearer-token checks for read/view endpoints.
   - intended for shared workstations or team-local environments.
3. `strict-auth-all`:
   - all endpoints require auth tokens.
   - requires explicit migration guidance for existing local scripts.

Migration notes:
- Default behavior remains `mvp-open-read` until a mode switch is explicitly configured.
- Future `optional-gated-read`/`strict-auth-all` modes must preserve response ordering and payload schema contracts.
- CLI/MCP adapters should surface mode expectations clearly and fail with deterministic `auth_required` envelopes when gated.

## Identity and namespace context
Each mutating request carries:
- `client_id` (string)
- `actor` (string: `user`, `app:<client-id>`, `system`)

Server enforces namespace ownership rules independent of caller-provided namespace values.
When namespace policy includes schema contract metadata (`required_keys`), write/promote payloads are validated and schema mismatches return `400` (`validation_error`).

### Actor-namespace contract matrix

| Actor | Read/view (`head/history/views`) | Write to `app/<client-id>/*` | Write to `user/*` | Promote to `user/*` |
|---|---|---|---|---|
| `user` | Allowed | Allowed only when policy grants match target app namespace | Direct write not default path; use promote policy model | Allowed (required actor for promote) |
| `app:<client-id>` | Allowed | Allowed for owned app namespace | Denied by default | Denied (must be user actor) |
| `system` | Allowed | Allowed only for explicit system-owned/maintenance policy scopes | Denied by default | Denied by default |

Policy notes:
- Namespace ownership policy is authoritative for write decisions.
- `user/*` remains protected and is updated through explicit user promotion semantics.

## Endpoints

### POST `/v1/namespaces/register`
Register a namespace owner policy.

Request:
- `namespace`
- `owner_type` (`user` | `app`)
- `owner_id`
- `policy` (object)

Response:
- `namespace`
- `owner_type`
- `owner_id`
- `policy`

### GET `/v1/namespaces/get`
Retrieve namespace owner + policy metadata.

Query:
- `namespace`

Response:
- `namespace`
- `owner_type`
- `owner_id`
- `policy`

### POST `/v1/context/write`
Append revision for `(namespace,key)`.

Request:
- `client_id`
- `actor`
- `namespace`
- `key`
- `payload`
- `reason` (optional)

Response:
- `record_id`
- `revision`
- `head_revision`
- `timestamp`

### POST `/v1/context/promote`
Promote a record into protected `user/*` with explicit approval semantics.

Request:
- `client_id`
- `actor` (`user` required)
- `from_namespace`
- `from_key`
- `to_namespace` (`user/*`)
- `to_key`
- `source_revision` (optional; defaults to current head)

Response:
- `promoted_record_id`
- `target_revision`

### GET `/v1/context/head`
Query:
- `namespace`
- `key`

Response:
- `record`

### GET `/v1/context/history`
Query:
- `namespace`
- `key`
- `limit` (optional)
- `cursor` (optional)

Response:
- `items` (stable oldest->newest window unless cursor semantics specify bounded page)
- `next_cursor`

### POST `/v1/views/evaluate`
Evaluate deterministic selector for context-aware retrieval.

Request:
- `selector` (object)
- `include_payload` (bool, default true)
- `limit` (optional)

Response:
- `items` (deterministically ordered)
- `evaluation_meta` (`sort_keys`, `matched_count`, `truncated`)

Selector limits:
- `namespaces`: max 32 patterns
- `keys`: max 128 entries
- `limit`: defaults to 200 when omitted/zero, max 500
- invalid selector complexity/shape returns `400` (`code: "validation_error"`)
- selector extension/versioning policy reference: `docs/SPECS/VIEWS.md#selector-extension-and-versioning-policy`

Deterministic ordering behavior:
- If `selector.order` is omitted, server applies fallback sort `(namespace,key,revision)`.
- `limit` truncation is applied after deterministic sort and reflected via `evaluation_meta.truncated`.

Valid request example:
```json
{
  "selector": {
    "namespaces": ["user/*", "app/editor/*"],
    "keys": ["goal", "summary"],
    "revision_scope": "head",
    "order": ["namespace", "key", "revision"]
  },
  "include_payload": false,
  "limit": 50
}
```

Valid response example:
```json
{
  "items": [
    {
      "namespace": "app/editor/session",
      "key": "goal",
      "revision": 3
    },
    {
      "namespace": "user/profile",
      "key": "summary",
      "revision": 8
    }
  ],
  "evaluation_meta": {
    "sort_keys": ["namespace", "key", "revision"],
    "matched_count": 2,
    "truncated": false
  }
}
```

Invalid selector examples (`400 validation_error`):
- Unknown selector field:
```json
{
  "selector": {
    "namespaces": ["user/*"],
    "order": ["namespace", "key", "revision"],
    "unknown_field": true
  }
}
```
- Limit above allowed maximum:
```json
{
  "selector": {
    "namespaces": ["user/*"],
    "order": ["namespace", "key", "revision"]
  },
  "limit": 1000
}
```

### GET `/v1/context/audit`
Query:
- `limit` (optional; default `50`, max `200`)
- `cursor` (optional; positive integer from prior `next_cursor`)
- `namespace` (optional exact filter)
- `event_type` (optional exact filter)

Response:
- `items` (newest-first deterministic ordering by `id DESC`)
- `count`
- `next_cursor` (nullable integer)

Example pagination:
1. `GET /v1/context/audit?limit=2`
2. Read `next_cursor` from response.
3. `GET /v1/context/audit?limit=2&cursor=<next_cursor>`

### GET `/v1/context/consistency/scan`
Run a deterministic consistency scan across index rows and payload files.

Response:
- `count` (integer)
- `issues` (array of typed findings such as `missing_payload`, `head_mismatch`, `missing_head`)

### POST `/v1/context/consistency/repair`
Rebuild `heads` from latest indexed revisions for each `(namespace,key)` pair.

Auth:
- Treated as mutating; requires bearer token when auth token is configured.

Response:
- `rebuilt_heads` (integer)
- `remaining_issues` (integer)
- `issues` (post-repair scan findings)

### GET `/v1/health/readiness`
Return deterministic operational readiness status.

Response:
- `healthy` (boolean)
- `status` (`healthy` | `degraded` | `failing`)
- `db_path` (string)
- `records_dir` (string)
- `records_dir_exists` (boolean)
- `schema_version` (integer)
- `consistency_issues` (integer)
- `generated_at` (RFC3339 UTC)

### GET `/v1/metrics` (optional)
Expose lightweight runtime request counters and latency aggregates.

Behavior:
- Endpoint is enabled only when service starts with metrics flag (`contextd serve --metrics`).
- When disabled, endpoint returns `404`.

Response:
- `enabled` (boolean)
- `routes` (array of route metrics sorted by `(method,path)`)
  - `method`
  - `path`
  - `requests`
  - `errors`
  - `latency_ns_total`
  - `latency_ns_avg`
  - `status_counts` (object keyed by HTTP status code)
  - `recent_request_ids` (array of most recent request IDs for route correlation)
- `totals`
  - `requests`
  - `errors`

## Determinism requirements
- Identical store state + identical request must produce identical item ordering.
- Selector evaluation must use explicit sort keys; fallback sort is `(namespace,key,revision)`.
- APIs never mutate state during read/view calls.
