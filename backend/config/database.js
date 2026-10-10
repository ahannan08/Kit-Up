import mongoose from 'mongoose';
import { env } from './env.js';
import { User } from '../Schemas/userSchema.js';
import { Cart } from '../Schemas/cartSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Jersey } from '../Schemas/jerseySchema.js';

const models = [User, Cart, Purchase, Jersey];

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
export async function ensureCollections() {
  for (const Model of models) {
    try {
      await Model.createCollection();
    } catch (err) {
      if (err.code !== 48 && err.codeName !== 'NamespaceExists') {
        throw err;
      }
    }
    await Model.syncIndexes();
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
