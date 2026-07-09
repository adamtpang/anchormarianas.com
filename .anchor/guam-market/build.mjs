// build.mjs — merge Guam Google Maps shards into a deduplicated market database.
// Reads .anchor/guam-market/shards/*.json (each a JSON array of place records),
// dedups by placeId, filters to Guam, and emits master JSON + CSV + an overview.
// Run: node .anchor/guam-market/build.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SHARDS = join(HERE, 'shards');

if (!existsSync(SHARDS)) {
  console.error('No shards directory at', SHARDS);
  process.exit(1);
}

const shardFiles = readdirSync(SHARDS).filter((f) => f.endsWith('.json'));
if (shardFiles.length === 0) {
  console.error('No shard .json files found in', SHARDS);
  process.exit(1);
}

let raw = [];
const perShard = {};
for (const f of shardFiles) {
  let arr = [];
  try {
    const parsed = JSON.parse(readFileSync(join(SHARDS, f), 'utf8'));
    arr = Array.isArray(parsed) ? parsed : (parsed.items || []);
  } catch (e) {
    console.error('Failed to parse', f, e.message);
  }
  perShard[f] = arr.length;
  raw = raw.concat(arr);
}

// --- Guam filter: keep GU country, 969xx postal, or blank (locationQuery already bounded to Guam) ---
const GUAM_VILLAGES = new Set([
  'hagatna', 'agana', 'tamuning', 'tumon', 'upper tumon', 'dededo', 'yigo',
  'mangilao', 'barrigada', 'mongmong-toto-maite', 'mongmong', 'toto', 'maite',
  'sinajana', 'agana heights', 'chalan pago-ordot', 'chalan pago', 'ordot',
  'yona', 'talofofo', 'inarajan', 'inalahan', 'merizo', 'malesso', 'umatac',
  'humatak', 'agat', 'hagat', 'santa rita', 'sant rita', 'piti', 'asan-maina',
  'asan', 'maina', 'harmon', 'apra harbor', 'nimitz hill', 'guam',
]);
const norm = (s) => (s || '').toString().trim();
const low = (s) => norm(s).toLowerCase();

function isGuam(r) {
  const cc = low(r.countryCode);
  if (cc === 'gu') return true;
  if (cc && cc !== 'gu') return false; // explicit non-Guam => drop
  const pc = norm(r.postalCode);
  if (pc.startsWith('969')) return true;
  if (GUAM_VILLAGES.has(low(r.city))) return true;
  return false; // no signal => drop to stay clean
}

// --- dedup by placeId, merging search-term provenance ---
const byId = new Map();
let droppedNonGuam = 0;
let noPlaceId = 0;
for (const r of raw) {
  if (!isGuam(r)) { droppedNonGuam++; continue; }
  const id = norm(r.placeId);
  if (!id) { noPlaceId++; continue; }
  if (!byId.has(id)) {
    byId.set(id, { ...r, foundVia: new Set([norm(r.searchString)].filter(Boolean)) });
  } else {
    const ex = byId.get(id);
    if (r.searchString) ex.foundVia.add(norm(r.searchString));
    // prefer a record that has phone/website if the kept one lacks it
    if (!norm(ex.phone) && norm(r.phone)) ex.phone = r.phone;
    if (!norm(ex.website) && norm(r.website)) ex.website = r.website;
    if ((ex.reviewsCount || 0) < (r.reviewsCount || 0)) {
      ex.reviewsCount = r.reviewsCount;
      ex.totalScore = r.totalScore;
    }
  }
}

const village = (r) => {
  const c = norm(r.city);
  if (c) return c;
  const n = norm(r.neighborhood);
  if (n) return n;
  return 'Unknown';
};

const businesses = [...byId.values()].map((r) => ({
  name: norm(r.title),
  category: norm(r.categoryName),
  categories: Array.isArray(r.categories) ? r.categories : [],
  village: village(r),
  address: norm(r.address),
  postalCode: norm(r.postalCode),
  phone: norm(r.phone),
  phoneRaw: norm(r.phoneUnformatted),
  website: norm(r.website),
  hasWebsite: !!norm(r.website),
  hasPhone: !!(norm(r.phone) || norm(r.phoneUnformatted)),
  rating: typeof r.totalScore === 'number' ? r.totalScore : null,
  reviews: typeof r.reviewsCount === 'number' ? r.reviewsCount : 0,
  permanentlyClosed: !!r.permanentlyClosed,
  temporarilyClosed: !!r.temporarilyClosed,
  open: !(r.permanentlyClosed || r.temporarilyClosed),
  placeId: norm(r.placeId),
  mapsUrl: norm(r.url),
  lat: r.location && r.location.lat != null ? r.location.lat : (r['location.lat'] ?? null),
  lng: r.location && r.location.lng != null ? r.location.lng : (r['location.lng'] ?? null),
  foundVia: [...r.foundVia],
}));

// sort: open first, then by reviews desc
businesses.sort((a, b) => (b.open - a.open) || (b.reviews - a.reviews));

// --- write master JSON ---
writeFileSync(join(HERE, 'guam-businesses.json'), JSON.stringify(businesses, null, 2));

// --- write CSV ---
const csvEsc = (v) => {
  const s = (v == null ? '' : String(v));
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const cols = ['name', 'category', 'village', 'phone', 'website', 'rating', 'reviews', 'open', 'address', 'mapsUrl', 'placeId'];
const csv = [cols.join(',')]
  .concat(businesses.map((b) => cols.map((c) => csvEsc(b[c])).join(',')))
  .join('\n');
writeFileSync(join(HERE, 'guam-businesses.csv'), csv);

// --- aggregates ---
const total = businesses.length;
const openCount = businesses.filter((b) => b.open).length;
const closed = total - openCount;
const withSite = businesses.filter((b) => b.hasWebsite).length;
const withPhone = businesses.filter((b) => b.hasPhone).length;

const byCat = {};
for (const b of businesses) byCat[b.category || 'Uncategorized'] = (byCat[b.category || 'Uncategorized'] || 0) + 1;
const byVill = {};
for (const b of businesses) byVill[b.village] = (byVill[b.village] || 0) + 1;

const topCats = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 40);
const villRows = Object.entries(byVill).sort((a, b) => b[1] - a[1]);

// opportunity segments for outbound
const noWebsite = businesses.filter((b) => b.open && !b.hasWebsite);
const strongNoSite = noWebsite.filter((b) => b.reviews >= 20).sort((a, b) => b.reviews - a.reviews);
const noReviews = businesses.filter((b) => b.open && b.reviews === 0);
const lowStar = businesses.filter((b) => b.open && b.rating != null && b.rating < 4 && b.reviews >= 10).sort((a, b) => a.rating - b.rating);

const mdEsc = (s) => String(s).replace(/\|/g, '\\|');
let md = '';
md += '# Guam market map — Google Maps scrape (partial, first cut)\n\n';
md += `Generated by \`build.mjs\` from ${shardFiles.length} shard file(s). This is a PARTIAL dataset: the full sweep was interrupted when the Apify account hit its monthly usage hard limit. It still covers the core SMB verticals.\n\n`;
md += '## Totals\n';
md += `- Unique businesses (deduped by Google placeId): **${total}**\n`;
md += `- Open: **${openCount}** · Closed (temp/permanent): ${closed}\n`;
md += `- With a website: ${withSite} (${((withSite / total) * 100).toFixed(0)}%) · No website: ${total - withSite} (${(((total - withSite) / total) * 100).toFixed(0)}%)\n`;
md += `- With a phone number: ${withPhone} (${((withPhone / total) * 100).toFixed(0)}%)\n`;
md += `- Dropped as non-Guam: ${droppedNonGuam} · records without placeId: ${noPlaceId}\n\n`;
md += '### Raw records per shard (before dedup)\n';
for (const [f, n] of Object.entries(perShard)) md += `- ${f}: ${n}\n`;
md += `- **Raw total: ${raw.length}** → **${total} unique after Guam filter + dedup**\n\n`;

md += '## Businesses by village\n\n| Village | Count |\n|---|---|\n';
for (const [v, n] of villRows) md += `| ${mdEsc(v)} | ${n} |\n`;
md += '\n';

md += '## Top 40 categories\n\n| Category | Count |\n|---|---|\n';
for (const [c, n] of topCats) md += `| ${mdEsc(c)} | ${n} |\n`;
md += '\n';

md += '## Outbound opportunity segments\n\n';
md += `These are drawn from the partial data and are the fastest angles for Anchor.\n\n`;
md += `### Open businesses with NO website (${noWebsite.length})\n`;
md += `A website/care offer wedge. Of these, ${strongNoSite.length} have 20+ reviews (real demand, no web presence). Top 25:\n\n`;
md += '| Business | Category | Village | Reviews | Rating | Phone |\n|---|---|---|---|---|---|\n';
for (const b of strongNoSite.slice(0, 25)) md += `| ${mdEsc(b.name)} | ${mdEsc(b.category)} | ${mdEsc(b.village)} | ${b.reviews} | ${b.rating ?? ''} | ${mdEsc(b.phone)} |\n`;
md += '\n';
md += `### Open businesses with strong demand but sub-4.0 rating (${lowStar.length})\n`;
md += `Reputation / review-response wedge (10+ reviews, under 4 stars). Top 25:\n\n`;
md += '| Business | Category | Village | Reviews | Rating | Phone |\n|---|---|---|---|---|---|\n';
for (const b of lowStar.slice(0, 25)) md += `| ${mdEsc(b.name)} | ${mdEsc(b.category)} | ${mdEsc(b.village)} | ${b.reviews} | ${b.rating ?? ''} | ${mdEsc(b.phone)} |\n`;
md += '\n';
md += `### Open businesses with zero reviews (${noReviews.length})\n`;
md += `Get-found / first-reviews wedge. Full list in guam-businesses.json (filter reviews == 0).\n\n`;

md += '## Files\n';
md += '- `guam-businesses.json` — full deduped records (all fields)\n';
md += '- `guam-businesses.csv` — spreadsheet view\n';
md += '- `shards/` — raw per-sector pulls\n';

writeFileSync(join(HERE, 'guam-market-overview.md'), md);

// stdout summary
console.log(JSON.stringify({
  shardFiles,
  perShard,
  rawTotal: raw.length,
  droppedNonGuam,
  noPlaceId,
  uniqueBusinesses: total,
  open: openCount,
  closed,
  withWebsite: withSite,
  noWebsite: noWebsite.length,
  strongNoSite: strongNoSite.length,
  noReviews: noReviews.length,
  lowStar: lowStar.length,
  topVillages: villRows.slice(0, 8),
  topCategories: topCats.slice(0, 12),
}, null, 2));
