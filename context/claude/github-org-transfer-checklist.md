# GitHub org transfer checklist: Anchor

Prepped 2026-08-10, ahead of the org actually existing. Nothing here has
been executed - this is the plan for once `github.com/account/organizations/new`
is done (name candidates confirmed available at prep time: `anchor-marianas`,
`anchormarianas`).

## Which repos actually belong in this org

Checked each candidate's own `repos.yaml` rather than assuming from the
`fraud-defense` cluster label:

- **`anchormarianas.com`** - definite. `repos.yaml` states it directly:
  "Adam's Guam-based AI/digitalization agency, Anchor Marianas LLC." Public
  repo, default branch `main`, real Vercel link
  (`prj_Dz3Ej8GdWxpIKAc21Lw6NFI5Jo1d`, team `team_94z2L2r0X8hywHS0hi2ahkW7`).
- **`idiguam.com`** - definite. Both repos.yaml files confirm: "billed and
  delivered as Anchor Marianas LLC work." Private repo, default branch
  `master` (inconsistent with anchormarianas.com's `main` - worth knowing,
  not necessarily worth fixing before transfer). Real Vercel link
  (`prj_Z2FhoA64nKvBnCPt1ay4BSTcUYHx`, same Vercel team as above).
- **`beware.dog`** - judgment call, not automatic. Its own `repos.yaml`
  says it "shares the Stripe account brand a buyer sees at checkout" with
  anchormarianas.com and "the same founder-led SMB sales motion" - real
  operational tie, but it's a separately branded product (fraud-watch
  service, not published under the Anchor Marianas name). Your call
  whether shared billing identity is enough to move it into this org.
- **`sellsniper.com`** - excluded. Shares the `fraud-defense` cluster
  label with beware.dog, but its own repos.yaml describes an unrelated
  product (artifact-to-outreach targeting tool) with no Anchor Marianas
  LLC branding or billing tie anywhere in its file. Cluster label alone
  isn't a real reason to move it.

## Pre-transfer (before touching GitHub)

- [ ] Confirm the org name you actually created (`anchor-marianas` or
      `anchormarianas` per availability check, or whatever you picked)
- [ ] Decide on `beware.dog` - in or out
- [ ] Note current visibility per repo so it's preserved on transfer:
      `anchormarianas.com` is **public**, `idiguam.com` is **private**
- [ ] `gh auth refresh -s admin:org` if you want me doing any org-level
      `gh` actions after the transfer (current token lacks `admin:org`)

## The transfer itself (per repo, GitHub web UI - transfers aren't scriptable via API)

For each repo: Settings → General → scroll to Danger Zone → "Transfer
ownership" → type the new org name → confirm. GitHub preserves stars,
issues, PRs, and visibility automatically.

- [ ] Transfer `anchormarianas.com`
- [ ] Transfer `idiguam.com`
- [ ] Transfer `beware.dog` (if decided in)

## Post-transfer fixes (the actual risk points)

- [ ] **Vercel GitHub connection.** This is the real risk, not a formality.
      Both projects deploy via Vercel's GitHub integration. Moving a repo
      to a new GitHub org can silently break that link if Vercel's GitHub
      App isn't installed on the new org. After each transfer: open the
      Vercel project (Settings → Git) and confirm it still shows the repo
      as connected. If it shows disconnected, install the Vercel GitHub
      App on the new org (github.com/apps/vercel → Configure → add the new
      org) and reconnect the project to the transferred repo.
- [ ] **Local git remotes**, one command per repo, or the next `git push`
      fails with a stale-URL error:
      ```bash
      git -C /c/Users/adamp/Aether/anchormarianas.com remote set-url origin https://github.com/<new-org>/anchormarianas.com.git
      git -C /c/Users/adamp/Aether/idiguam.com remote set-url origin https://github.com/<new-org>/idiguam.com.git
      ```
- [ ] **CI workflows** - checked, no hardcoded `adamtpang` string found in
      any of anchormarianas.com's 9 workflow files, so no edits needed
      there. `idiguam.com` has no `.github/workflows/` at all, nothing to
      fix. Confirm this stays true after transfer (a quick `gh run list`
      on each repo to see the next push still triggers CI).
- [ ] **Repo-level GitHub Actions secrets** (Supabase tokens etc. used by
      anchormarianas.com's DB-migration workflows) transfer automatically
      with the repo per GitHub's own transfer behavior - no action needed,
      but worth a live check that the first post-transfer CI run actually
      passes rather than assuming.
- [ ] `repos.yaml` `url:` fields do **not** need changes - they point at
      the live deployed site (`https://anchormarianas.com`,
      `https://idiguam.com`), not the GitHub location.

## Not part of this checklist

- Org-level branch protection rules, teams, or member invites - set those
  up fresh in the new org, nothing to migrate from the personal account.
- Domain/DNS - unaffected by a GitHub ownership transfer, no action needed.
