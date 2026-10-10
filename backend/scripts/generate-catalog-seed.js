/**
 * Regenerate backend/seed/catalog.seed.json from frontend data files (metadata only; imageUrl empty).
 * Run from repo root: node backend/scripts/generate-catalog-seed.js
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

const jerseysText = readFileSync(path.join(root, 'frontend/kit-app/src/data/jerseys.js'), 'utf8');
const clubsText = readFileSync(path.join(root, 'frontend/kit-app/src/data/clubs.js'), 'utf8');

const leagueDefs = [
  { marker: 'const pl = [', name: 'Premier League', country: 'England' },
  { marker: 'const laliga = [', name: 'La Liga', country: 'Spain' },
  { marker: 'const seria = [', name: 'Serie A', country: 'Italy' },
  { marker: 'const bundesliga = [', name: 'Bundesliga', country: 'Germany' },
  { marker: 'const ligue1 = [', name: 'Ligue 1', country: 'France' },
];

function sliceArraySection(text, marker) {
  const start = text.indexOf(marker);
  if (start < 0) return '';
  const from = start + marker.length;
  const end = text.indexOf('];', from);
  return text.slice(from, end);
}

const leagues = [];
const clubs = [];
leagueDefs.forEach((lg, idx) => {
  const leagueId = `id_league_${idx}`;
  leagues.push({ id: leagueId, name: lg.name, country: lg.country, logoUrl: '' });
  const section = sliceArraySection(clubsText, lg.marker);
  const re = /club:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(section))) {
    clubs.push({
      id: `id_club_${idx}_${m[1].replace(/\s+/g, '_')}`,
      leagueId,
      name: m[1],
      crestUrl: '',
    });
  }
});

const jerseyBlocks = jerseysText.match(/\{[^}]*_id:[^}]+\}/g) || [];
const jerseys = [];
for (const block of jerseyBlocks) {
  const _id = block.match(/_id:\s*["']([^"']+)["']/)?.[1];
  const club = block.match(/club:\s*["']([^"']+)["']/)?.[1];
  const type = block.match(/type:\s*["']([^"']+)["']/)?.[1];
  const price = Number(block.match(/price:\s*(\d+)/)?.[1]);
  if (!_id || !club || !type || !price) continue;
  jerseys.push({
    id: `id_seed_${_id}`,
    _id: String(_id),
    legacyId: Number(_id),
    clubName: club,
    type,
    price,
    rating: 4,
    description: `${club} ${type} kit — official-style replica.`,
    imageUrl: '',
  });
}

const outDir = path.join(__dirname, '../seed');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'catalog.seed.json'), JSON.stringify({ leagues, clubs, jerseys }, null, 2));
console.log(`Wrote ${jerseys.length} jerseys, ${clubs.length} clubs, ${leagues.length} leagues`);
