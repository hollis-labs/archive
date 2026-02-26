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

## Freshness note convention
Use a one-line freshness marker near the top of each artifact in both output sets:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Preferred format:
- `Freshness: verified against canonical specs on YYYY-MM-DD`

Guidance:
- Update the freshness line whenever artifact content is revised for spec/ADR alignment.
- If the artifact is intentionally stale pending canonical updates, mark it explicitly (for example: `Freshness: stale pending API spec update`).
- Keep canonical-source precedence explicit in the artifact body (summary guidance must never override source specs/ADRs).

## Ownership and review cadence
Apply the same lightweight ownership model across both artifact sets:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Ownership guidance:
- Each artifact should identify a default maintainer role in PR context (for example: API implementer, architect, or operator docs owner).
- The maintainer role is responsible for freshness-note updates when canonical specs/ADRs change.

Review cadence guidance:
- Trigger review on any canonical spec/ADR change touching referenced behavior.
- Run a periodic sweep at least once per release window to catch stale summary drift.
- If ownership is unclear, treat the PR author modifying canonical behavior as temporary owner until reassigned.

Canonical precedence:
- Ownership and cadence controls exist to keep summaries aligned; they do not elevate outputs above canonical specs/ADRs.

## Stale-artifact triage
Use this triage flow for stale artifacts in both sets:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Triage classes:
- `critical`: artifact contradicts canonical behavior or references removed contract fields.
- `important`: artifact omits recently added canonical behavior with operational impact.
- `routine`: wording/format drift without behavioral mismatch.

Priority order:
1. Update `critical` items before new feature docs are published.
2. Resolve `important` items in the same release window as the canonical change.
3. Batch `routine` items into regular documentation maintenance passes.

Triage rule:
- When uncertainty exists, treat canonical specs/ADRs as source of truth and downgrade artifact confidence until refreshed.

## Update sequencing
Apply this sequencing for both artifact sets:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Recommended order:
1. Update canonical spec/ADR sources first.
2. Refresh affected output artifacts immediately after canonical merge.
3. Re-run freshness/triage checks and update ownership notes where needed.
4. Perform release-prep sweep to catch any remaining stale artifacts before publication.

Sequencing rule:
- If sequencing conflicts with delivery timing, preserve canonical-source correctness first and mark outputs as stale until refreshed.

## Release-readiness check
Run this check before release publication for both:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Release check items:
1. Freshness markers updated for artifacts touched by canonical changes.
2. Stale-artifact triage reviewed and no unresolved `critical` items remain.
3. Update sequencing completed (canonical first, outputs refreshed, sweep done).
4. Canonical-source precedence statements remain present where summary guidance is provided.

Release rule:
- If any item fails, keep release notes anchored to canonical specs/ADRs and mark affected outputs as pending refresh.

## Stale-marker remediation
When an artifact is marked stale in either set:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Remediation expectations:
1. Assign a responsible owner immediately (or default to the most recent canonical-change author).
2. Set expected refresh timing in the current release window unless explicitly deferred.
3. Update artifact content and freshness marker after canonical source verification.
4. If deferred, keep stale marker explicit and record follow-up action in the next maintenance pass.

Remediation rule:
- Stale markers are temporary safety signals; canonical specs/ADRs remain the authoritative source until refresh is complete.

## Stale deferral disclosure
When stale remediation is intentionally deferred for either:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Include a short disclosure in the stale artifact:
1. Reason for deferral.
2. Expected refresh window (date or release window).
3. Assigned owner for follow-through.

Disclosure rule:
- Keep the stale marker visible until refresh completes; canonical specs/ADRs remain the authoritative reference during deferral.

Stale-status annotation examples:
- Active stale state:
  - `Freshness: stale pending API spec update`
- Deferred stale state:
  - `Freshness: stale (deferred until 2026-03 release window; owner: docs-ops)`

## Stale annotation review note
When stale guidance changes, review both output sets:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Review focus:
1. Stale annotation examples still match current deferral disclosure guidance.
2. Active/deferred stale wording stays consistent across artifacts.
3. Canonical-source precedence statements remain present alongside stale annotations.

## Stale annotation audit note
Run a lightweight periodic audit across:
- `docs/outputs/*`
- `docs/SPECS/outputs/*`

Audit checks:
1. Stale markers and annotation examples follow the same current format.
2. Deferral disclosures include reason, expected window, and owner when applicable.
3. Canonical-source precedence text remains present near stale guidance.

## Stale annotation exception note
When a temporary exception to stale annotation guidance is required:
1. Exception disclosure:
   - State the specific exception and why standard stale annotation format cannot be used.
2. Exception window + owner:
   - Record expected end window and assigned owner for re-alignment.
3. Canonical precedence carry-forward:
   - Keep canonical-source precedence language adjacent to the exception note until standard format is restored.

## Stale annotation normalization note
After an exception window closes, normalize stale annotations by:
1. Format restoration:
   - Restore standard stale marker/disclosure wording used across both output artifact sets.
2. Residual cleanup:
   - Remove obsolete exception phrasing once replacement guidance is verified.
3. Precedence confirmation:
   - Reconfirm canonical-source precedence text remains explicit near normalized stale guidance.

## Maintenance checklist
1. After updating canonical specs/ADRs, verify linked summary artifacts still match current behavior.
2. Validate links for both:
   - `docs/outputs/*` artifacts (architecture/open-questions/changelog)
   - `docs/SPECS/outputs/*` artifacts (API/CLI summary notes)
3. If an artifact becomes stale, update the summary text and keep canonical references explicit.
4. Confirm role-based and quickstart entry points still route to the most useful current artifacts.
5. Preserve canonical-source precedence language when editing this index.
