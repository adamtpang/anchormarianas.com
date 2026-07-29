# Vercel Domain Resurrection List

Date: 2026-07-07

Source dashboard:

- Original: `C:\Users\adamp\OneDrive\Aether\vercel\vercel-estate.html`
- Copied here: `context/claude/vercel-estate-dashboard.html`

This file is the action list for "get all the down project/domain links up" so
the work is not buried inside the full estate dashboard.

## Already Fixed After The Snapshot

- `300words.app` - was 404 in the dashboard snapshot, but was later attached to
  the `300words.app` Vercel project and verified HTTP 200.

## Vercel-DNS Orphans

These domains already point at Vercel. They are down because no production
deployment is assigned. Once the Shipyard hub exists, attach these domains to the
hub or redirect them into relevant sections.

- `adam.gives`
- `finn.monster`
- `founderchurch.com`
- `legends.guide`
- `nskpi.com`
- `problemindex.fun`
- `problemindex.fund`
- `thedojo.fun`
- `thegreats.fun`
- `worthy.quest`
- `yourlife.guru`

Recommended handling:

- Point most of them to `shipyard.anchormarianas.com` or `/shipyard`.
- Use `nskpi.com` for Network School / APAC metrics or redirect to the Network
  School section.
- Use `problemindex.fun` for the "problems worth solving" section.
- Use `thedojo.fun`, `worthy.quest`, `legends.guide`, and `thegreats.fun` as
  themed entrances into the builder/career/story sections.
- Consider dropping `problemindex.fund` if it has no specific use; it renews at a
  higher price than `.fun`.

## External DNS / Registrar Work Required

These are not just Vercel assignment problems. DNS is outside Vercel or not
pointing correctly, so Adam needs to update the registrar/DNS first.

- `caldump.com` - has a matching Vercel project/deployment waiting; fix external
  DNS, then attach.
- `book.movie` - project exists; apex was not resolving in the snapshot.
- `hower.app`
- `scorecard.social`
- `wayfind.world`
- `xray.social`

Recommended DNS fix:

- Point nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`, or
- Set apex `A` record to `76.76.21.21` and configure `www` as needed.

After DNS is corrected, attach each domain to the correct Vercel project or to
the Shipyard hub.

## Wrong-Content / Likely Lost

- `light90.com` - was serving a Chinese crypto-wallet page in the estate sweep,
  not Adam's content. Treat as possibly lapsed, re-registered, or pointed away at
  the registrar. Do not include in the Shipyard until ownership/DNS is verified.

## Shipyard Dependency

Do not attach every orphan to a blank page. The better sequence is:

1. Build `/shipyard` in `anchormarianas.com`.
2. Configure `shipyard.anchormarianas.com`.
3. Attach Vercel-DNS orphans to the hub or redirect them into sections.
4. Fix external DNS domains and attach them one by one.
5. Refresh the estate dashboard after every batch so the status list stays true.
