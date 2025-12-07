import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
  });
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
