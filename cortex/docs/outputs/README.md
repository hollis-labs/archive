# Pivot Output Artifacts Index

Status: reference index

This directory (and `docs/SPECS/outputs/`) contains generated pivot support notes. Canonical behavior remains in source specs/ADRs.

## Quickstart
- Use case: "I need a fast orientation to pivot scope and architecture decisions."
  - Start with [`updated-architecture-summary.md`](./updated-architecture-summary.md), then confirm details in canonical architecture/scope docs.
- Use case: "I need runnable/communicable API/CLI examples."
  - Start with spec output notes in `docs/SPECS/outputs/`, then validate exact behavior in [`docs/SPECS/API.md`](../SPECS/API.md) and [`docs/SPECS/CLI.md`](../SPECS/CLI.md).
- Use case: "I need current unresolved decisions and follow-up direction."
  - Start with [`open-questions.md`](./open-questions.md) and [`pivot-changelog.md`](./pivot-changelog.md), then trace linked canonical specs/ADRs.

## Choose Your Start
- Operator:
  - Start with [`open-questions.md`](./open-questions.md) and [`docs/SPECS/MCP.md`](../SPECS/MCP.md), then use canonical API/CLI specs for exact command/error semantics.
- Architect:
  - Start with [`updated-architecture-summary.md`](./updated-architecture-summary.md), then confirm decisions in [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md).
- API implementer:
  - Start with [`docs/SPECS/outputs/api-diff.md`](../SPECS/outputs/api-diff.md), then validate final contracts in [`docs/SPECS/API.md`](../SPECS/API.md) and [`docs/SPECS/VIEWS.md`](../SPECS/VIEWS.md).

## Architecture and scope artifacts
- [`updated-architecture-summary.md`](./updated-architecture-summary.md)
  - Canonical sources:
    - [`docs/SCOPE.md`](../SCOPE.md)
    - [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
    - [`docs/SPECS/STORAGE.md`](../SPECS/STORAGE.md)
    - [`docs/DECISIONS/ADR-0002-generalized-context-registry.md`](../DECISIONS/ADR-0002-generalized-context-registry.md)
- [`open-questions.md`](./open-questions.md)
  - Canonical sources:
    - [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
    - [`docs/SPECS/API.md`](../SPECS/API.md)
    - [`docs/SPECS/VIEWS.md`](../SPECS/VIEWS.md)
    - [`docs/SPECS/MCP.md`](../SPECS/MCP.md)

## API/CLI pivot artifacts
- [`docs/SPECS/outputs/api-diff.md`](../SPECS/outputs/api-diff.md)
  - Canonical sources:
    - [`docs/SPECS/API.md`](../SPECS/API.md)
    - [`docs/SPECS/VIEWS.md`](../SPECS/VIEWS.md)
    - [`docs/SPECS/STORAGE.md`](../SPECS/STORAGE.md)
- [`docs/SPECS/outputs/cli-examples.md`](../SPECS/outputs/cli-examples.md)
  - Canonical sources:
    - [`docs/SPECS/CLI.md`](../SPECS/CLI.md)
    - [`docs/SPECS/API.md`](../SPECS/API.md)
    - [`docs/SPECS/VIEWS.md`](../SPECS/VIEWS.md)

## Documentation history artifacts
- [`pivot-changelog.md`](./pivot-changelog.md)
  - Canonical sources:
    - [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md)
    - [`docs/SPECS/API.md`](../SPECS/API.md)
    - [`docs/SPECS/CLI.md`](../SPECS/CLI.md)
    - [`docs/SPECS/VIEWS.md`](../SPECS/VIEWS.md)
    - [`docs/SPECS/MCP.md`](../SPECS/MCP.md)

## Usage note
These artifacts are summaries and operator-facing guides. When conflicts appear, the canonical source specs/ADRs take precedence.

## Maintenance checklist
1. After updating canonical specs/ADRs, verify linked summary artifacts still match current behavior.
2. Validate links for both:
   - `docs/outputs/*` artifacts (architecture/open-questions/changelog)
   - `docs/SPECS/outputs/*` artifacts (API/CLI summary notes)
3. If an artifact becomes stale, update the summary text and keep canonical references explicit.
4. Confirm role-based and quickstart entry points still route to the most useful current artifacts.
5. Preserve canonical-source precedence language when editing this index.
