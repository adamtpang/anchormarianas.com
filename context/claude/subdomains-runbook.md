# Subdomains runbook - idi.anchormarianas.com + procurement.anchormarianas.com

Plan only. Nothing here was executed. All steps are additive and reversible; no deletions anywhere.
Written 2026-07-15. Team: adamtpangs-projects (team_94z2L2r0X8hywHS0hi2ahkW7).

## Verified state (read-only, via Vercel API this session)
- Project `idi` EXISTS: prj_Z2FhoA64nKvBnCPt1ay4BSTcUYHx
- Project `idiprocurement`: NOT visible in the first 50 projects returned by the API. Verify it exists in the dashboard before starting section B (the API list may paginate; if it truly does not exist, the recovery in Aether/Spawn/_recovery must run first anyway).
- anchormarianas.com is a Vercel-managed domain on project `anchormarianas.com`, so subdomain DNS is handled inside Vercel (no external registrar visit needed).

## A. idi.anchormarianas.com -> project "idi" (safe to do now)

Dashboard clicks (2 minutes):
1. vercel.com -> team adamtpangs-projects -> project **idi** -> Settings -> Domains.
2. Add domain: type `idi.anchormarianas.com` -> Add.
3. Because anchormarianas.com is already a Vercel domain in this same team, Vercel auto-provisions the DNS record and the TLS cert. No manual record needed in the normal case.
4. If Vercel does ask for a record (only if DNS is managed elsewhere): add a CNAME at your DNS provider:
   - Host/Name: `idi`
   - Value: `cname.vercel-dns.com`
   - TTL: default
5. Wait for the domain row to show "Valid Configuration" (usually under a minute, TLS auto).
6. Verify: `curl -I https://idi.anchormarianas.com` returns 200 and serves the idiguam site.

Optional after verify: set idi.anchormarianas.com as the project's primary domain so idiguam.vercel.app redirects to it (Settings -> Domains -> ... -> Set as Primary). Reversible.

## B. procurement.anchormarianas.com -> project "idiprocurement" (GATED, do not rush)

HARD GATES, in order:
1. **Recovery first.** The GitHub source for idiprocurement is deleted. The staged recovery lives at `Aether/Spawn/_recovery` and MUST be run and verified before any change to this app. Do not add domains, change settings, or trigger redeploys before the source is recovered and pushed to a new repo.
2. **Deployment Protection stays ON.** This is an internal tool with real cost data. After the domain is added, confirm: project idiprocurement -> Settings -> Deployment Protection -> "Standard Protection" (or stricter) covering production. The subdomain must prompt for Vercel auth when visited logged-out. If it renders publicly, STOP and re-enable protection before anything else.

Then the same domain steps as A:
3. Project **idiprocurement** -> Settings -> Domains -> Add `procurement.anchormarianas.com`.
4. Auto-DNS applies as in A (same team, Vercel-managed apex). CNAME fallback identical (`procurement` -> cname.vercel-dns.com).
5. Verify logged-out in an incognito window: you should hit the Vercel authentication wall, NOT the app. That is the success state for an internal tool.

## Notes
- No em dashes in this doc by house rule.
- Neither step touches the anchormarianas.com project or the live site.
- Rollback for either: project -> Settings -> Domains -> remove the subdomain row. DNS auto-cleans on Vercel-managed domains.
