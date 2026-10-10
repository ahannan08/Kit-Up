import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Jersey } from '../Schemas/jerseySchema.js';
import { League } from '../Schemas/leagueSchema.js';
import { Club } from '../Schemas/clubSchema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, 'catalog.seed.json');

let ingestPromise = null;

/** Remove legacy/partial catalog rows that break unique indexes on `id`. */
export async function repairCatalogCollections() {
  const invalid = { $or: [{ id: null }, { id: { $exists: false } }] };
  const legacyJerseys = { legacyId: { $exists: false } };

  const [badJerseys, badClubs, badLeagues] = await Promise.all([
    Jersey.countDocuments({ $or: [invalid, legacyJerseys] }),
    Club.countDocuments(invalid),
    League.countDocuments(invalid),
  ]);

  if (badJerseys > 0) {
    await Jersey.deleteMany({ $or: [invalid, legacyJerseys] });
    console.log(`🧹 Removed ${badJerseys} invalid jersey document(s)`);
  }
  if (badClubs > 0) {
    await Club.deleteMany(invalid);
    console.log(`🧹 Removed ${badClubs} invalid club document(s)`);
  }
  if (badLeagues > 0) {
    await League.deleteMany(invalid);
    console.log(`🧹 Removed ${badLeagues} invalid league document(s)`);
  }
}

export async function ensureCatalogInMongo() {
  if (process.env.SKIP_CATALOG_SEED === 'true') {
    return;
  }

  const count = await Jersey.countDocuments();
  if (count > 0) {
    return;
  }

  if (!ingestPromise) {
    ingestPromise = ingestFromSeedFile();
  }
  await ingestPromise;
}

async function ingestFromSeedFile() {
  try {
    const raw = readFileSync(SEED_PATH, 'utf8');
    const payload = JSON.parse(raw);
    await importCatalogPayload(payload);
    const n = await Jersey.countDocuments();
    console.log(`✅ Catalog ingested from seed file (${n} jerseys)`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('ℹ️ No catalog.seed.json; catalog will ingest on first POST /api/catalog/import');
      return;
    }
    throw err;
  }
}

/** Insert catalog when DB is empty (used by seed file and import API). */
export async function importCatalogPayload(payload) {
  const count = await Jersey.countDocuments();
  if (count > 0) {
    const withImages = await Jersey.countDocuments({ imageUrl: { $nin: ['', null] } });
    if (withImages > 0) {
      return { imported: false, reason: 'already_populated' };
    }
    await Promise.all([Jersey.deleteMany({}), Club.deleteMany({}), League.deleteMany({})]);
  }

  const { leagues = [], clubs = [], jerseys = [] } = payload;
  if (!jerseys.length) {
    return { imported: false, reason: 'no_jerseys' };
  }

  if (leagues.length) {
    await League.insertMany(
      leagues.map((l) => ({
        id: l.id,
        name: l.name,
        country: l.country || '',
        logoUrl: l.logoUrl || '',
      }))
    );
  }

  if (clubs.length) {
    await Club.insertMany(
      clubs.map((c) => ({
        id: c.id,
        leagueId: c.leagueId,
        name: c.name,
        crestUrl: c.crestUrl || '',
      }))
    );
  }

  await Jersey.insertMany(
    jerseys.map((j) => ({
      id: j.id,
      legacyId: Number(j.legacyId ?? j._id),
      clubName: j.clubName,
      type: j.type,
      price: j.price,
      rating: j.rating ?? 3,
      description: j.description || '',
      imageUrl: j.imageUrl || '',
    }))
  );

  return { imported: true, jerseyCount: jerseys.length };
}
