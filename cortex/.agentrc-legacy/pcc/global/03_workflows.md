---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Workflows

## Build and run

```bash
# Build
go build ./cmd/contextd

# Start API server (default :8080)
contextd serve

# Start with managed auth
contextd serve --managed-auth --addr :8080

# Start with static token
contextd serve --static-token <token> --addr :8080

# Enable metrics + request logging
contextd serve --metrics --request-logs --addr :8080
```

## First-time bootstrap

```bash
contextd context bootstrap --default-app editor --output json
```

Idempotent; seeds baseline namespaces.

## Common operations

```bash
# Write context
contextd context put --client-id editor-ui --actor app:editor-ui \
  --namespace app/editor/session --key summary --json '{"text":"..."}'

# Read head
contextd context head --namespace app/editor/session --key summary

# Promote to user namespace
contextd context promote --client-id user-shell --actor user \
  --from-namespace app/editor/session --from-key summary \
  --to-namespace user/profile --to-key summary

# Audit trail
contextd context audit --limit 50 --output table

# Health check
contextd context health --summary --output table

# Token management
contextd context token issue --label admin --ttl 24h
contextd context token rotate --token <old> --label admin --ttl 24h
contextd context token revoke --token <token>

# Backup/restore
contextd context backup export --out /path/to/backup.json
contextd context backup restore --in /path/to/backup.json

# Retention compaction
contextd context compact --keep-revisions 20 --keep-audit 10000 --output table
```

## Testing workflow

```bash
make test         # unit + integration
make contracts    # golden fixture verification
make smoke BASE_URL=http://127.0.0.1:8080 AUTH_MODE=managed TOKEN=<t> METRICS=1
make e2e-local    # full harness
```

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: docs/DEV.md, Makefile, README.md
