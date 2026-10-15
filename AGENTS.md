# archive

Frozen copies of retired Hollis Labs repositories, in one public repository, with their history. Each lives at `<name>/` with an `ARCHIVED.md` that states the source repository name, its HEAD sha and date. It is archived, not maintained, not buildable.

It is not: a place for live code. Nothing here is built, tested, updated or supported.

## Start Here

- `README.md` - what this repository is and how to use it.
- `<name>/` - one top-level directory per imported repository. Code arrives through `scripts/import-repo`.
- `scripts/` - all tooling (`repo.conf` holds the per-repository settings).
- `scan-public.allow.d/` - owner-reviewed allowlists for the public-hygiene scan, one `<name>.allow` per imported repository.
- `.github/workflows/` - `guards.yml` runs layout and scan-public on every push and pull request. There is deliberately no build or test job.

## Commands

```sh
scripts/check-layout                          # layout guard
scripts/scan-public                           # secrets / hosts / private paths, tree and history
scripts/scan-public --source <path-or-url>    # scan a repository before importing it
scripts/import-repo [--target DIR] <source> [<name>]
```

## Boundaries

- Bring code in with `scripts/import-repo <source> [<name>]`, not by copying files, so history survives. It lands at `<name>/` at the repository root (flat, no groups), keeping original commits, authors and dates, and merges with a merge commit that records the source name, its HEAD and its tags. Old tags are not carried; they are listed in the merge commit message. Work on a branch, not main; set `GIT_FILTER_REPO` if `git-filter-repo` is not on PATH.
- Stop conditions. `scripts/import-repo` refuses, before writing anything, a source whose history (any commit, any ref) holds a file over 10 MiB, a submodule (`.gitmodules` or a gitlink) or Git LFS. These need an owner decision; there is no override flag. Do not work around them (no squashing, no history rewrite of the source) without that decision.
- Clean break: no shims, redirects, aliases, deprecation stubs or transitional re-exports. The original repository is deleted by the owner after the import; nothing here points back at it.
- This repository is public. Nothing secret, no token, internal host name, internal address or personal path may enter a file, a commit message or CI config. `scripts/import-repo` scans the source (tip and every commit) with `scripts/scan-public` first, and a finding stops the import. Allowlist entries (`RULE-ID PATH-GLOB REASON`, in `scan-public.allow.d/<name>.allow`) are owner-reviewed; the reason says why, and never quotes a secret value or a literal address. `scripts/check-layout` rejects entries without a reason.
- Archived code is imported verbatim: nothing is rewritten, renamed or dropped (a `go.mod` keeps its old module line, a `go.work` or `AGENTS.md` stays as it was). The import adds one follow-up commit with `<name>/ARCHIVED.md` (source name, HEAD sha, date).
- Nothing is built, vetted or tested, locally or in CI. Do not add a build or test workflow, a toolchain setup or a Makefile at the root; `scripts/check-layout` fails a workflow that does.
- Every top-level directory is an archived repository and must carry its `ARCHIVED.md`. No `go.mod` or `go.work` at the root.
- Do not fix, update or modernise archived code. To revive something, move it out into a live repository (an owner decision).
- Documentation names, in prose, only things a stranger can see in this repository or on the public Hollis Labs organization.

## Do Not

- Add a `CLAUDE.md`; `AGENTS.md` is the single instruction file.
- Create the GitHub repository, push, or tag on your own; those are the owner's steps.
- Copy files in by hand instead of importing, or import a repository that tripped a stop condition.
