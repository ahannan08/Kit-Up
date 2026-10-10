import app from './app.js';
import { assertRequiredEnv, env } from './config/env.js';
import { ensureDatabaseReady } from './config/database.js';
import { ensureCatalogInMongo } from './seed/ensureCatalogInMongo.js';

assertRequiredEnv();

async function start() {
  try {
    await ensureDatabaseReady();
    try {
      await ensureCatalogInMongo();
    } catch (err) {
      console.error('⚠️ Catalog seed skipped:', err.message);
    }

    app.listen(env.port, () => {
      console.log(`🚀 Server listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
