---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Project Identity

**Cortex** (Context Memory Service) is a deterministic context persistence and retrieval service for local clients. It provides append-only record storage with namespace ownership, revision tracking, provenance, and auditable history.

Cortex complements Volon's PCC layer: PCC is canonical for agent/session orchestration state, while Cortex provides application-facing context storage with policy enforcement.

## Goals

- Local-first append-only context storage with deterministic reads
- Namespace-safe writes with explicit ownership boundaries (app namespaces, protected `user/*`)
- Provenance and revision tracking on every write
- Promotion workflow from app namespaces to user namespaces
- CLI, HTTP API, and MCP adapter interfaces
- Contract-driven development with golden fixture verification

## Non-goals

- Automatic semantic merging or synthesis during retrieval
- Distributed consensus or cloud synchronization
- Hidden mutation side effects in read operations

## Active configuration

- `agentrc.yaml`: file-based storage backend, PCC enabled, worktrees enabled
- Module: `github.com/hollis-labs/volon-dev` (Go 1.25)
- Binary: `contextd` (CLI + server)
- Default server address: `:8080`
- Auth: bearer-token (static or managed with issue/rotate/revoke lifecycle)

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: README.md, docs/SCOPE.md, docs/ARCHITECTURE.md, docs/DEV.md, agentrc.yaml, go.mod
