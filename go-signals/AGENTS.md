# go-signals

Deliberately empty. This repository is parked: there is no Go module, no code
and no scaffold, and none is planned until a real consumer drives the design.
It exists to reserve the name and to make the deferral discoverable.

## Start Here

- `README.md` is the whole repository. It records what the library was going to
  be, the two reasons the justification evaporated, and the conditions that
  reopen the decision.

## Commands

None. There is no `go.mod`, so there is nothing to build, test or lint here.

## Boundaries

Do not scaffold this repository to make it look conventional. The absence of
code is the current decision, and a placeholder module would hide it.

If you are here because something needs line-by-line subprocess signal parsing,
check the revisit conditions in `README.md` first — the original stdout-marker
vocabulary came from a sunset project and cannot be carried into a public
extraction, and Clockwork replaced its own stdout protocol with MCP tool calls.
Reopening needs a named consumer, not a plausible one.
