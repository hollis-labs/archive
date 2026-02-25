# Local Development

Status: active draft

## Prerequisites
- Go toolchain (version per `go.mod`)
- Git

## Planned workflows
- Build and test commands for service components
- Local run instructions for CLI/API/desktop app
- Test data and fixture workflows

## Build and test
- Run full tests: `go test ./...`
- Run targeted integration/auth tests: `go test ./tests/integration -run AuthGate`

## API auth (MVP)
- Mutating HTTP endpoints support bearer-token auth.
- Configure the server with an auth token and send:
  - `Authorization: Bearer <token>`
- If token is configured and missing/mismatched, server returns:
  - HTTP `401`
  - `{"code":"auth_required","message":"missing or invalid bearer token","details":null}`

### Managed token lifecycle (local admin path)
- Issue token: `contextd context token issue --label admin --ttl 24h`
- Rotate token: `contextd context token rotate --token <old-token> --label admin --ttl 24h`
- Revoke token: `contextd context token revoke --token <token>`
- List token metadata: `contextd context token list --output table`
- In managed mode, revoked/expired tokens are rejected for mutating API endpoints.

Safe local handling:
- Do not commit tokens into the repository.
- Prefer exporting tokens into a local shell session (`export CONTEXTD_TOKEN=...`) or an untracked env file.
- Rotate tokens after local sharing events and revoke obsolete tokens promptly.

Rotation checklist:
1. Issue or rotate to obtain a new token.
2. Update local runtime environment with the new token.
3. Verify API mutating route access with the new token.
4. Revoke the old token.

## Service runner
- Start API server (default `:8080`): `contextd serve`
- Start with managed token auth: `contextd serve --managed-auth --addr :8080`
- Start with legacy static token: `contextd serve --static-token <token> --addr :8080`
- Enable local diagnostics endpoint: `contextd serve --metrics --addr :8080`
- Configure graceful shutdown timeout: `contextd serve --shutdown-timeout 10s`
- Managed auth guard: server startup fails if no active token exists.
- Metrics endpoint: `GET /v1/metrics` (available only when `--metrics` is enabled).
- Service lifecycle: `SIGINT`/`SIGTERM` trigger graceful shutdown and deterministic shutdown logs.

## Namespace schema contract operations
- Register namespace: `contextd context namespace register --namespace app/editor/session --owner-type app --owner-id editor`
- Show namespace policy: `contextd context namespace show --namespace app/editor/session`
- Use `required_keys` policy to enforce top-level payload keys for writes/promotions.

## Consistency operations
- CLI scan report: `contextd context doctor --output json`
- CLI head rebuild + report: `contextd context repair-heads --output table`
- API scan endpoint: `GET /v1/context/consistency/scan`
- API repair endpoint: `POST /v1/context/consistency/repair` (mutating auth rules apply)

## Audit operations
- CLI audit query: `contextd context audit --limit 50 --output table`
- API audit query: `GET /v1/context/audit?limit=50`

## Backup and restore
- Export snapshot: `contextd context backup export --out /path/to/backup.json`
- Verify snapshot integrity: `contextd context backup verify --in /path/to/backup.json`
- Restore snapshot: `contextd context backup restore --in /path/to/backup.json`
- Expected behavior: deterministic record/history parity and restored audit/token metadata.

## Readiness checks
- CLI readiness report: `contextd context health --output table`
- API readiness report: `GET /v1/health/readiness`
- Readiness includes storage-path status, schema version, and consistency issue count.

## First-time bootstrap
- Run deterministic setup: `contextd context bootstrap --default-app editor --output json`
- Command seeds baseline namespaces and returns readiness summary.
- Re-running bootstrap is idempotent.

## Retention and compaction
- Compact revisions + trim audit events:
  - `contextd context compact --keep-revisions 5 --keep-audit 5000 --output table`
- Compaction preserves latest heads per `(namespace,key)` and rebuilds head pointers deterministically.

## API contract fixtures
- Golden API contract fixture: `tests/integration/fixtures/api_contract_golden.json`
- Contract suite: `go test ./tests/integration -run APIContract`
- Update process: modify fixture intentionally alongside API shape changes and include rationale in commit message.

## Metrics contract checks
- Golden metrics fixture: `tests/integration/fixtures/metrics_contract_golden.json`
- Contract suite: `go test ./tests/integration -run MetricsContract`
- Local query example: `curl -s http://127.0.0.1:8080/v1/metrics | jq .`

## Service smoke checks
- Script: `scripts/contextd-smoke.sh`
- No-auth server:
  - `contextd serve --addr 127.0.0.1:8080`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080`
- Static auth server:
  - `contextd serve --static-token local-dev-token --addr 127.0.0.1:8080`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --token local-dev-token`
- Managed auth server:
  - `contextd context token issue --label local --ttl 24h --output table`
  - `contextd serve --managed-auth --addr 127.0.0.1:8080 --metrics`
  - `scripts/contextd-smoke.sh --base-url http://127.0.0.1:8080 --token <issued-token> --metrics`

## Repository conventions
- Product specifications: `docs/SPECS/`
- Architecture decisions: `docs/DECISIONS/`
- Agent artifacts: `artifacts/` and `outputs/`
- Volon runtime state: `.volon/`
