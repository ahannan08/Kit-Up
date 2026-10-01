import mongoose from 'mongoose';
import { env } from './env.js';
import { User } from '../Schemas/userSchema.js';
import { Cart } from '../Schemas/cartSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Jersey } from '../Schemas/jerseySchema.js';

const models = [User, Cart, Purchase, Jersey];

export async function connectDatabase() {
  await mongoose.connect(env.mongoUri);
  const { host, name } = mongoose.connection;
  console.log(`✅ MongoDB connected (${name} @ ${host})`);
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
