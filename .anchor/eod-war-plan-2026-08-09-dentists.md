# EOD war plan: dentist batch · 2026-08-09

Resuming the outbound push after a 4-week gap (last run: 2026-07-11). Same
cadence as before: 4 personalized sends today, WhatsApp/call, top of the
HOT list. Niche-down to dentists specifically: 10 of the top 15 HOT leads
in `.anchor/guam-leads/guam-leads-summary.md` are dentists, the strongest
concentrated signal in the whole 1,067-business list.

**Apify token not configured** (`APIFY_API_TOKEN not set`, confirmed live
this session), so no fresh Google-review pulls were possible. Web search
for real review text on these specific dentists turned up unreliable,
likely-misattributed results (other dentists named "Kenny" in other US
states), not used, to avoid the exact kind of invented/wrong claim Anchor
Scan exists to prevent. Every read below is **listing-based, thinner by
design**, same honest pattern as the A/C Doctor read from the last batch:
verified facts only (no website on file, phone, category, village, source
directory), explicitly offering the full review read as the next step once
someone says yes.

**Data-quality note found while prepping this**: several dentist "leads"
in the raw list share a phone number (e.g., Family Dental Center and
Malilay Janice DDS; ISA Dental and Johnson Jeffrey DDS; Eusebio Andrew DDS,
Ordot Dental Clinic, and Rapadas Antonio DDS), almost certainly the same
physical office recorded under different dentist names from different
source directories, not independent businesses. Deduped by phone number
before picking today's 4 so the same front desk doesn't get contacted
twice.

---

## BLOCK A · 4 personalized openers (dentists, no website on file)

### A1 · Bourgeois Kenny DDS · Tamuning · (671) 646-2010
> Hi, this is Adam Pangelinan, from Guam. I help island businesses find what's costing them customers using AI, free to start. Quick one: your practice doesn't show a website on your Google listing, and that usually means people comparing dentists in Tamuning click past you to the next one that has one. I do a free read on where a business is leaking customers, want me to run one for your practice?

### A2 · Hafa Adai Family Dental, PC · Tamuning · (671) 649-7851
> Hi, this is Adam Pangelinan, from Guam. Same thing I tell other dentists here: your listing doesn't show a website, and that's usually the first thing that costs a practice new-patient calls when people compare options online. I do a free read on where a business is leaking customers, want me to run one for Hafa Adai?

### A3 · ISA Dental · Hagatna · (671) 646-7982
> Hi, this is Adam Pangelinan, from Guam. Quick one: ISA Dental doesn't show a website on your Google listing right now. For a dental practice that usually means lost new-patient calls to whoever shows up next with a site. I do a free read on where a business is leaking customers, want me to run one?

### A4 · Mangilao Dental Clinic (Joon Ha, DDS) · Mangilao · (671) 969-4242
> Hi, this is Adam Pangelinan, from Guam. Quick one: Mangilao Dental Clinic doesn't show a website on your listing, which usually costs practices new-patient calls to whoever else in the area does have one. I do a free read on where a business is leaking customers, want me to run one?

---

## REPLY PLAYBOOK (same as last batch, unchanged)
- "Sure / send it" → run a real AnchorScan read before sending anything
  further. Do not paste a fabricated review-based read. If Apify still
  isn't available, offer the manual path: ask them directly what they'd
  want fixed first, or note "still gathering your review data, will follow
  up" rather than inventing content.
- "How much?" → "Fixed prices, no quotes: anchormarianas.com/pricing."
- "Who is this?" → "Adam Pangelinan, from Guam, my family runs IDI. I
  build AI tools for island businesses. Saw something on your listing
  worth flagging, free to look at."
- "Stop / not interested" → "All good, thanks for reading." Log, never
  touch again.

## EOD SCOREBOARD
- [ ] 4 sends (A1-A4)
- [ ] replies logged within 5 min of receipt
- [ ] any call booked
- [ ] any Apify/manual review data obtained for a next-batch upgrade

Log every send and reply here as it happens, then roll the result into
`EVIDENCE.md`'s results log: that's the step that got skipped last time.
