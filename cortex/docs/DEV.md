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

## Consistency operations
- CLI scan report: `contextd context doctor --output json`
- CLI head rebuild + report: `contextd context repair-heads --output table`
- API scan endpoint: `GET /v1/context/consistency/scan`
- API repair endpoint: `POST /v1/context/consistency/repair` (mutating auth rules apply)

## Audit operations
- CLI audit query: `contextd context audit --limit 50 --output table`
- API audit query: `GET /v1/context/audit?limit=50`

## Repository conventions
- Product specifications: `docs/SPECS/`
- Architecture decisions: `docs/DECISIONS/`
- Agent artifacts: `artifacts/` and `outputs/`
- Volon runtime state: `.volon/`
