import mongoose from 'mongoose';
import { env } from './env.js';
import { User } from '../Schemas/userSchema.js';
import { Cart } from '../Schemas/cartSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Jersey } from '../Schemas/jerseySchema.js';
import { League } from '../Schemas/leagueSchema.js';
import { Club } from '../Schemas/clubSchema.js';
import { repairCatalogCollections } from '../seed/ensureCatalogInMongo.js';

const catalogModels = [League, Club, Jersey];
const models = [User, Cart, Purchase, ...catalogModels];

let collectionsReady = false;
let readyPromise = null;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 15000,
    maxPoolSize: 5,
  });
  const { host, name } = mongoose.connection;
  console.log(`✅ MongoDB connected (${name} @ ${host})`);
  return mongoose.connection;
}

/** Ensures collections exist and indexes are synced (MongoDB has no SQL-style migrations here). */
async function syncModelIndexes(Model) {
  try {
    await Model.syncIndexes();
  } catch (err) {
    if (!catalogModels.includes(Model)) {
      throw err;
    }
    console.warn(
      `⚠️ Catalog index sync failed for ${Model.collection.name} (${err.message}); resetting collection`
    );
    await Model.collection.drop().catch(() => {});
    await Model.createCollection();
    await Model.syncIndexes();
  }
}

export async function ensureCollections() {
  await repairCatalogCollections();

  for (const Model of models) {
    try {
      await Model.createCollection();
    } catch (err) {
      if (err.code !== 48 && err.codeName !== 'NamespaceExists') {
        throw err;
      }
    }
    await syncModelIndexes(Model);
  }
  console.log(`✅ Collections ready: ${models.map((m) => m.collection.name).join(', ')}`);
}

/** Connect once per instance; safe for local server and Vercel serverless warm starts. */
export async function ensureDatabaseReady() {
  if (collectionsReady) {
    return;
  }
  if (!readyPromise) {
    readyPromise = (async () => {
      await connectDatabase();
      await ensureCollections();
      collectionsReady = true;
    })();
  }
  await readyPromise;
}
