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
- Restore snapshot: `contextd context backup restore --in /path/to/backup.json`
- Expected behavior: deterministic record/history parity and restored audit/token metadata.

## Readiness checks
- CLI readiness report: `contextd context health --output table`
- API readiness report: `GET /v1/health/readiness`
- Readiness includes storage-path status, schema version, and consistency issue count.

## Repository conventions
- Product specifications: `docs/SPECS/`
- Architecture decisions: `docs/DECISIONS/`
- Agent artifacts: `artifacts/` and `outputs/`
- Volon runtime state: `.volon/`
