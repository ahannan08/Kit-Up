import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './Routes/authRoutes.js';
import clubRouter from './Routes/clubRoutes.js';
import paymentRouter from './Routes/paymentRoutes.js';
import cartRouter from './Routes/cartRoutes.js';
import orderRouter from './Routes/orderRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { ensureDatabaseReady } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'kit-up-api' });
});

app.use(async (req, res, next) => {
  if (req.path === '/health') {
    return next();
  }
  try {
    await ensureDatabaseReady();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/clubs', express.static(path.join(__dirname, 'shared/clubs')));

app.use('/auth', authRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/payment', paymentRouter);
app.use('/api', cartRouter);
app.use('/order', orderRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
