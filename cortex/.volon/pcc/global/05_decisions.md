---
intent: pcc_global
project: cortex
updated_at: "2026-03-04"
---

# Architectural Decisions

## ADR-0001 — Storage and Namespaces
- **Context:** Need a storage model that supports append-only records with namespace isolation
- **Decision:** SQLite index + file record store with `(namespace, key)` as primary addressing; single head per pair
- **Status:** Accepted

## ADR-0002 — Generalized Context Registry
- **Context:** Originally scoped as agent context only; pivoted to general context registry for user and app clients
- **Decision:** `user/*` as first-class protected namespace; `app/<client-id>/*` for app/agent context; promotion workflow for cross-namespace writes
- **Status:** Accepted

## Design decisions (from architecture docs)

- **Append-only records:** no in-place payload mutation; every write creates a new revision
- **Deterministic ordering:** identical selectors always return identical results for same store state
- **Policy engine:** namespace ownership enforced; `user/*` requires explicit promotion/approval from app contexts
- **Contract-driven development:** golden JSON fixtures as API contract source of truth; intentional fixture updates only
- **Auth model:** bearer-token auth with managed lifecycle (issue/rotate/revoke) or static token for dev
- **Cortex complements PCC:** does not replace `.volon/pcc/*` as orchestrator ground truth

## Evidence
- Last refreshed: 2026-03-04 (mentat PCC bootstrap)
- Sources: docs/DECISIONS/ADR-0001-storage-and-namespaces.md, docs/DECISIONS/ADR-0002-generalized-context-registry.md, docs/ARCHITECTURE.md, docs/SCOPE.md
