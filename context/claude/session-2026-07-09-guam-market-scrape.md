# Session context export · 2026-07-09

Full working context for this session so a fresh Claude/Codex run can resume with zero loss. Two threads: (1) the daily outbound packet, (2) the Guam Google Maps market scrape (paused by an Apify billing cap). No em dashes by preference. Booking link is always https://cal.com/adamtpang (cal.com/adampang 404s, never use it).

---

## THE ONE BLOCKER (founder-only)

Apify account (adamtpang@gmail.com) hit its **monthly usage hard limit** mid-scrape. This LOCKS the datasets: cannot run new scrapes AND cannot read the ~2,115 records already paid for. Also breaks the daily reviews scrape.

**Fix:** Apify Console → Settings → Billing & Usage → Usage limits → raise the monthly hard limit to ~$50 (full sweep needs ~$30-45 total), or upgrade off free tier. Then tell Claude "Apify is unlocked" and it runs the staged pipeline.

---

## Thread 1 · Daily outbound packet

File: `.anchor/daily-outbound-2026-07-09.md` (extended this session). Source of targets/verify notes: `.anchor/call-sheet-2026-07.md`.

Armed from REAL Google reviews (Apify `compass/Google-Maps-Reviews-Scraper`, id Xb8osYTtOjlsgI6k9):
1. **Quality Plumbing** (671) 632-4663 — armed earlier (reply-to-every-review pattern).
2. **J Nail (Harmon)** (671) 647-6245 — armed earlier.
3. **Angela Nail & Lash** (671) 989-5777 — armed this session. 4.3 stars, 65 reviews, near-zero owner replies. wa.me/16719895777. Corrected call sheet: the "no online booking" hook is WRONG (a review describes a deposit-to-book system).
4. **Luxury Nails Guam** — DM channel (@luxurynailsguam IG/FB or luxurynailsguam@gmail.com; owner also lists WhatsApp 671.472.5899). 3.9 stars, 133 reviews, recurring walk-in-vs-appointment confusion; owner already writes long replies.
5. **Ace of Fades (Guam)** — BLOCKED on contact. Confirmed real shop: 845 Marine Corps Dr, Upper Tumon, 4.8 stars, 27 reviews, owner is **Ling** (not RJ). Ignore the NYC "Ace of Fades Barber Shop" (128 8th Ave, 409 reviews) and the Malaysia/Barbados listings. Get a Guam phone/DM before sending.

Send order recommendation: Angela first (one-tap wa.me), then Luxury Nails DM. Only Adam can hit send (TCPA + WhatsApp).

Review datasets pulled this session (locked now, but IDs for reference): Luxury Nails aWJf4VLl81qHnyT24, Angela nc4Sxpic87UQCnHKd, Ace of Fades PauEJXLYZfZY5jvyy.

---

## Thread 2 · Guam market scrape (the big one)

**Goal:** scrape all Guam businesses from Google Maps into one comprehensive, deduplicated market database that every future outbound run mines.

### Method (proven by calibration)
- Actor: **compass/crawler-google-places** (id `nwua9Gu5YrADL7ZDj`), FREE tier **$0.004/place** ($4 per 1,000).
- Base scrape returns everything needed at base rate: title, categoryName, categories, address, neighborhood, city (village), postalCode, countryCode, phone, phoneUnformatted, website, totalScore, reviewsCount, permanentlyClosed, temporarilyClosed, placeId, url, location.lat/lng. No paid add-ons used.
- Input pattern: `{searchStringsArray:[...many narrow category terms...], locationQuery:"Guam", maxCrawledPlacesPerSearch:120, language:"en", skipClosedPlaces:false}`.
- Google caps ~120 results per search term, so TILE the market with many narrow category terms and dedup by placeId. Broad terms ("restaurant","store") saturate at 120 and miss the tail.
- **Run sectors SEQUENTIALLY, one at a time.** Four concurrent runs is what pushed cumulative usage over the account cap and killed all four at once.

### Calibration (SUCCEEDED, kept)
Run bNAdlo4NEgOLAb3s1 → dataset **TMczuozp4WwIoPaIh**, 542 places. Terms: restaurant, plumber, nail salon, hotel, auto repair, store.

### Four sector sweeps (all FAILED partway = billing cap, partial data retained then locked)
| Batch | Sector | Run ID | Dataset ID | Partial count |
|---|---|---|---|---|
| A | Food & beverage | DfylNhoam92ll1Ibd | sN95leLAoA6Utk26Q | 483 |
| B | Home services & trades | Cwj7TJJW6J5Fgpaxx | P1YMcAyRiLKTprKXd | 283 |
| C | Auto / retail / personal care | MM82CmUN3cHbllzvn | rKtoV4GeTvYHpD7eh | 515 |
| D | Health / professional / misc | V2EvWx95cjQYc8dTT | yQHHnwUCgPtZ12tF7 | 292 |

Total raw scraped and paid for: **~2,115 records** (~$10-11 spent). All locked until the limit is raised.

### The exact category term lists (re-run these sequentially once unlocked)
- **Batch A (food, 45):** chamorro restaurant, filipino restaurant, japanese restaurant, korean restaurant, chinese restaurant, thai restaurant, indian restaurant, american restaurant, seafood restaurant, bbq restaurant, steakhouse, sushi restaurant, ramen, pizza restaurant, burger restaurant, fast food restaurant, food truck, buffet restaurant, fine dining, family restaurant, diner, cafe, coffee shop, bakery, bar, sports bar, night club, brewery, ice cream shop, dessert shop, juice bar, bubble tea, donut shop, catering service, deli, sandwich shop, breakfast restaurant, vegetarian restaurant, snack bar, izakaya, teppanyaki, poke restaurant, bakeshop, food court, wine bar
- **Batch B (trades, 44):** electrician, hvac contractor, air conditioning repair, general contractor, construction company, roofing contractor, landscaping service, lawn care, pest control, cleaning service, janitorial service, handyman, painter, carpenter, welding service, metal fabrication, concrete contractor, masonry, flooring contractor, tile contractor, glass company, window installation, garage door service, fence contractor, pool service, solar installer, appliance repair, locksmith, moving company, storage facility, waste management, hardware store, building materials, lumber yard, equipment rental, generator service, water heater service, septic service, sign company, security system installer, cctv installation, tree service, excavation, surveyor
- **Batch C (auto/retail/personal, 44):** car dealer, used car dealer, car rental, auto parts store, tire shop, car wash, oil change service, auto body shop, motorcycle dealer, boat dealer, gas station, hair salon, barber shop, beauty salon, spa, massage, lash salon, tattoo shop, skin care clinic, gym, fitness center, yoga studio, martial arts school, clothing store, shoe store, jewelry store, gift shop, souvenir shop, convenience store, grocery store, supermarket, pharmacy, pet store, pet grooming, veterinarian, florist, furniture store, electronics store, phone repair, computer store, bookstore, sporting goods store, optician, thrift store
- **Batch D (health/professional/misc, 44):** dentist, dental clinic, doctor, medical clinic, hospital, urgent care, chiropractor, physical therapy, optometrist, dermatologist, pediatrician, obgyn clinic, orthodontist, mental health clinic, counseling service, home health care, lawyer, law firm, accountant, accounting firm, tax service, bookkeeping service, insurance agency, real estate agency, property management, bank, credit union, financial advisor, travel agency, tour operator, dive shop, photographer, event venue, wedding planner, printing service, marketing agency, web design company, it services, funeral home, daycare, driving school, laundromat, dry cleaner, tailor

Optional for max completeness later: add `allPlacesNoSearchAction: "all_places_no_search_ocr"` map-sweep over Guam to catch businesses no keyword matches.

### Staged and ready (built this session)
- **`.anchor/guam-market/build.mjs`** — Node script. Reads `shards/*.json`, dedups by placeId (merges search-term provenance into `foundVia`, prefers records with phone/website, keeps max review count), filters to Guam (countryCode GU / 969xx / known village), writes `guam-businesses.json` + `guam-businesses.csv` + `guam-market-overview.md` (totals, by-village, by-category, and outbound opportunity segments: no-website, sub-4-star with demand, zero-review). Run: `node .anchor/guam-market/build.mjs`.
- **`.anchor/guam-market/shards/`** — empty dir, waiting for shard files.
- **Ingest workflow** (run wf_ab28f31e-c13). 5 agents, one per dataset, each fetches its dataset with a lean field projection and writes a shard file. Field projection used: `title,categoryName,categories,address,neighborhood,city,postalCode,state,countryCode,phone,phoneUnformatted,website,totalScore,reviewsCount,permanentlyClosed,temporarilyClosed,placeId,url,searchString,location.lat,location.lng`. Re-run it FRESH once unlocked (not from cache: cached agent results are the lock failures). Shard filenames: calibration.json, food.json, trades.json, retail-auto-personal.json, health-professional.json.

### Resume recipe (once Apify is unlocked)
1. Re-run the ingest workflow fresh to pull the ~2,115 already-scraped records into `shards/`.
2. `node .anchor/guam-market/build.mjs` → first market map from what we have.
3. Re-run Batches A-D sequentially (term lists above) for full coverage, write each to `shards/`, re-run build.mjs.
4. Report deduped totals, village/category breakdown, and the opportunity CSVs.

---

## Files created/changed this session
- `.anchor/daily-outbound-2026-07-09.md` (extended: Angela, Luxury Nails, Ace of Fades sections + log)
- `.anchor/guam-market/build.mjs` (new)
- `.anchor/guam-market/shards/` (new dir, empty)
- `context/claude/session-2026-07-09-guam-market-scrape.md` (this file)
- memory: `anchor_apify_limit.md` (new) + line added to `MEMORY.md`

## Next actions
- **Founder-only:** raise the Apify monthly usage limit (unblocks both the market scrape and the daily reviews scrape). Send the Angela + Luxury Nails DMs; get a Guam contact for Ace of Fades.
- **Delegable to Claude (after unlock):** run the resume recipe above; deliver `guam-businesses.csv` + overview.
