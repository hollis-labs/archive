# Agent Setup Guide

How to configure Claude Code (or any MCP-compatible client) to use the Context
Memory Service as a persistent memory backend.

---

## Quick setup

### 1. Build and install

```bash
go build -o contextd ./cmd/contextd
cp contextd /usr/local/bin/contextd   # or ~/bin/contextd
```

### 2. Create a token with write access

```bash
export CONTEXTD_ROOT="$HOME/.context"

contextd context token create \
  --name claude-agent \
  --scopes write,packet,promote.request \
  --namespaces "app/claude/*" \
  --ttl 8760h
```

Copy the raw token value — you need it in the next step.

### 3. Add `.mcp.json` to your project

```json
{
  "mcpServers": {
    "context": {
      "command": "/usr/local/bin/contextd",
      "args": ["mcp", "--token", "<paste-token-here>"],
      "env": {
        "CONTEXTD_ROOT": "/Users/<you>/.context"
      }
    }
  }
}
```

### 4. Restart Claude Code

The `context_*` tools will appear in Claude Code's tool list.

---

## MCP tool reference

### Read tools (no token required)

#### `context_head`
Read the latest revision of a record.

```json
{
  "namespace": "app/claude/session/task-001",
  "key": "state"
}
```

Response:
```json
{
  "record_id": "rec_abc123",
  "namespace": "app/claude/session/task-001",
  "key": "state",
  "payload": {"status": "in_progress", "step": 3},
  "revision": 2,
  "actor": "mcp-agent",
  "created_at": "2026-02-27T10:00:00Z",
  "checksum": "sha256:..."
}
```

Not found response (not an error — check `code` field):
```json
{"code": "not_found", "message": "no head record for app/claude/session/task-001/state"}
```

---

#### `context_history`
Read revision history for a record, newest first.

```json
{
  "namespace": "app/claude/session/task-001",
  "key": "state",
  "limit": 10
}
```

Response:
```json
{"items": [...], "count": 3}
```

---

#### `context_view`
Evaluate a view selector across multiple namespaces.

```json
{
  "namespaces": "app/claude/session/*,user/memory/*",
  "revision_scope": "head",
  "limit": 50
}
```

`namespaces` is a comma-separated list of glob patterns.
`revision_scope` is `head` (default) or `all`.

---

#### `context_packet`
The **primary agent continuity tool**. Returns a budget-bounded bundle of
records with a manifest summarizing what was included.

```json
{
  "namespaces": "app/claude/session/*,user/memory/*",
  "include_pins": true,
  "max_items": 50,
  "max_tokens_estimate": 8000,
  "payload_mode": "full"
}
```

- `include_pins`: prepend all `user/pins/*` records (pinned context always loaded first)
- `max_items`: hard item cap
- `max_tokens_estimate`: soft token budget (stops adding records when exceeded)
- `payload_mode`: `full` (default) or `head_only` (truncate payloads to 512 bytes)

Response:
```json
{
  "items": [...],
  "manifest": {
    "request_id": "mcp-abc123",
    "pins_included": 1,
    "items_returned": 8,
    "items_total": 8,
    "bytes_returned": 3200,
    "tokens_estimate": 820,
    "truncated": false,
    "truncation_reason": "",
    "sources": {"app/claude": 7, "user/memory": 1}
  }
}
```

---

### Write tools (require token with matching scope)

#### `context_write`
Write a record to a namespace. Requires `write` scope in the configured token.

```json
{
  "namespace": "app/claude/session/task-001",
  "key": "state",
  "payload": "{\"status\": \"in_progress\", \"step\": 3}",
  "actor": "app:claude",
  "record_type": "state"
}
```

`payload` must be a JSON string (not a JSON object — serialize it first).

Response:
```json
{
  "record_id": "rec_...",
  "revision": 1,
  "namespace": "app/claude/session/task-001",
  "key": "state"
}
```

Auth errors:
```json
{"code": "auth_required", "message": "no capability token configured for mutating operations"}
{"code": "insufficient_scope", "message": "token does not have scope: write"}
```

---

#### `context_promote_request`
Request promotion of a record from an `app/*` namespace to a `user/*` namespace.
Requires `promote.request` scope.

```json
{
  "source_namespace": "app/claude/session/task-001",
  "source_key": "summary",
  "target_namespace": "user/memory/claude",
  "target_key": "task-001-summary",
  "reason": "session complete, promoting for long-term memory",
  "actor": "app:claude"
}
```

Response:
```json
{"request_id": "req-abc123", "status": "pending"}
```

A human must then approve and apply the promotion via the CLI:
```bash
contextd context promote list
contextd context promote approve <request-id>
contextd context promote apply <request-id>
```

---

## Recommended namespace conventions

| Namespace pattern | Who writes | Purpose |
|---|---|---|
| `app/<agent-name>/session/<task-id>` | agent | Per-task working memory |
| `app/<agent-name>/observations` | agent | Cross-task observations |
| `app/<agent-name>/promotions` | agent | Pending promotion requests (auto) |
| `user/memory/<agent-name>` | human (via promotion) | Long-term human-approved memory |
| `user/pins/<label>` | human | Always-loaded context (pinned) |
| `user/cache/<key>` | either | Temporary shared state |

The token's `namespaces` field must match the namespace glob for write operations.
Example: a token with `namespaces: ["app/claude/*"]` can write to any
`app/claude/...` namespace but is rejected from `user/*`.

---

## Recommended token scopes

| Scope | Allows |
|---|---|
| `write` | `context_write` — append records |
| `packet` | (reserved for future gating; currently all agents can call `context_packet`) |
| `promote.request` | `context_promote_request` — request promotions |
| `promote.approve` | Approve pending promotion requests (human/admin) |
| `promote.apply` | Apply approved promotions (human/admin) |

Minimum recommended token for a typical agent: `--scopes write,promote.request`.

---

## Typical session lifecycle

### On session start (boot)

```
1. Call context_packet with your agent's session namespace and user/memory/*
2. Check manifest.pins_included — pinned context is always prepended
3. Load items into your system prompt or working context
4. Check for pending promotion requests from previous sessions
```

### During session (write observations)

```
1. After completing significant steps, call context_write to record state
2. Use namespace: "app/<your-agent>/session/<task-id>", key: "state"
3. Include structured data (step number, outcome, next action)
```

### On session end (promote important findings)

```
1. Write a summary record to your session namespace
2. Call context_promote_request to request promotion to user/memory/*
3. Include a clear reason explaining why this should be long-term memory
```

### Example agent session (pseudocode)

```
# Boot
packet = context_packet(namespaces="app/claude/session/*,user/memory/*")
# → use packet.items to restore prior context

# Work
context_write(namespace="app/claude/session/task-42", key="state",
              payload='{"status":"in_progress","checkpoint":{"step":3}}')

# Complete
context_write(namespace="app/claude/session/task-42", key="summary",
              payload='{"outcome":"success","key_findings":["...","..."]}')

context_promote_request(
  source_namespace="app/claude/session/task-42",
  source_key="summary",
  target_namespace="user/memory/claude",
  target_key="task-42-summary",
  reason="task complete, findings worth retaining"
)
```

---

## Pinning important context

Records in `user/pins/*` are always included first in every `context_packet`
response (unless `include_pins: false`). Use pins for context that should always
be present:

```bash
contextd context put \
  --namespace user/pins/project-brief \
  --key overview \
  --actor user \
  --json '{"project":"my-project","key_constraints":["no breaking changes","test coverage > 80%"]}'
```

---

## Troubleshooting

**`auth_required` from write tools**
→ Confirm `--token` is set in your `.mcp.json` args.

**`insufficient_scope`**
→ Recreate the token with the required scopes (`write`, `promote.request`).

**`write_failed` or namespace errors**
→ Check that your token's `namespaces` glob matches the namespace you're writing to.
→ Example: writing to `app/my-agent/session` requires a token with `namespaces: ["app/my-agent/*"]`.

**Records not found after write**
→ Verify `CONTEXTD_ROOT` in `.mcp.json` `env` matches the directory used when writing.
→ Both the `contextd serve` process and the MCP adapter must point to the same root.

**MCP adapter not starting**
→ Check stderr: `contextd MCP adapter starting (stdio)` should appear.
→ Confirm `CONTEXTD_ROOT` directory exists and is writable.
