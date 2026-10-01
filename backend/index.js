import app from './app.js';
import { assertRequiredEnv, env } from './config/env.js';
import { connectDatabase, ensureCollections } from './config/database.js';

assertRequiredEnv();

async function start() {
  try {
    await connectDatabase();
    await ensureCollections();

    app.listen(env.port, () => {
      console.log(`🚀 Server listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
