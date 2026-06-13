# /context/ — Shared Cross-Tool Memory

This directory is the shared memory layer between **Cofounder** (cofounder.ai) and **Claude** (Code + Chat) for the Anchor Marianas project. The repo itself is the shared memory: context updates are committed alongside code so both tools pick up durable, version-controlled state from git.

## Lanes

- `context/cofounder/` — owned by Cofounder agents (cofounder.ai sessions).
- `context/claude/` — owned by Claude sessions (Claude Code and Claude Chat).

## Read/write rules

- Either tool **MAY READ** both directories.
- Each tool **WRITES ONLY** its own lane.
  - Cofounder writes under `context/cofounder/`.
  - Claude writes under `context/claude/`.
- Do not edit the other tool's lane. If you need to flag something for the other side, add an entry in your own lane's `open-questions.md` (or equivalent).

## File conventions

- All files are markdown.
- Append-friendly logs preferred — newest entries on top, dated (`YYYY-MM-DD`).
- Keep entries concise and decision-oriented. Link to code paths when relevant.

## Workflow

- **Before starting substantive work**, read this directory (both lanes) to pick up cross-tool context — recent decisions, open questions, prior session takeaways.
- **After substantive work**, append a short summary to your lane's `session-summaries.md` and update `decisions-log.md` / `open-questions.md` as needed.
- **Commit context updates with the code changes** they relate to, so the shared memory stays in lockstep with the codebase.

The repo IS the shared memory. Treat these files like any other durable engineering artifact.
