---
type: pcc-decisions
updated_at: 2026-02-27
---

# Architecture Decisions

## ADR-MVP-001 — GUI is post-MVP (2026-02-27)

**Status**: Accepted

**Context**: Evaluation of `SPEC-TASKS/Context Memory Service Evaluation/` revealed the
app has significant API/store gaps (no tier model, no context packets, no capability tokens,
no gated promotion, no MCP adapter) before it is usable by agents. A GUI sprint was
in progress as the next work item.

**Decision**: Defer all GUI tasks to `sprint-post-mvp-gui`. MVP is defined as:
CLI + API + MCP adapter usable by agents. The GUI is a client; build it against a
stable, well-understood API.

**Consequences**:
- 8 GUI tasks moved to `sprint-post-mvp-gui` (status: deferred, priority: C)
- 3 low-value doc note tasks cancelled
- 2 new MCP adapter tasks created (TASK-20260227-019, 020)
- Bootstrap re-pointed to TASK-20260227-005 (Phase 0 start)
- The GUI, when built, will be simpler and more coherent because the API it consumes is stable

**References**: `artifacts/plan/mvp-replan-2026-02-27.md`

---

## ADR-MVP-002 — Evaluation spec is ground truth for MVP (2026-02-27)

**Status**: Accepted

**Context**: `SPEC-TASKS/Context Memory Service Evaluation/Evaluatoin-Results.md` and
`Phases.md` provide a structured P0/P1/P2 evaluation and a 6-phase implementation roadmap.
These were created as an external evaluation of the codebase against stated intent.

**Decision**: Evaluation spec wins on all conflicts with prior planning artifacts.
The 6 phases become the MVP sprint sequence. Prior GUI-first planning is superseded.

**Consequences**:
- Sprint sequence: Phase0 → Phase1 → Phase2 → Phase3 → Phase4 → Phase5 → MCP adapter
- No breaking-change constraints (app not live)
- Existing tasks 005-018 (already created from eval spec) are the correct backbone

**References**: `SPEC-TASKS/Context Memory Service Evaluation/`
