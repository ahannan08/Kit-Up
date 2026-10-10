import serverless from 'serverless-http';
import app from '../app.js';
import { assertRequiredEnv } from '../config/env.js';
import { ensureDatabaseReady } from '../config/database.js';

assertRequiredEnv();

const serverlessHandler = serverless(app);

export default async function handler(req, res) {
  await ensureDatabaseReady();
  return serverlessHandler(req, res);
}
