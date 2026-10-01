import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3009,
  /** Set in `backend/.env` — see `.env.example` */
  mongoUri: process.env.MONGO_URI || process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-in-production',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export function assertRequiredEnv() {
  if (!env.mongoUri) {
    console.error('❌ Missing MONGO_URI. Add it to backend/.env (see backend/.env.example).');
    process.exit(1);
  }
  if (!env.stripeSecretKey && env.nodeEnv !== 'test') {
    console.warn('⚠️ STRIPE_SECRET_KEY is not set — payment routes will fail.');
  }
}
