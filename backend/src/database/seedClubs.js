// backend/src/database/seeds/seedClubs.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root (3 levels up: seeds -> database -> src -> backend)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log("Loaded env from:", path.resolve(__dirname, '../../../.env'));
console.log("mongo uri is", process.env.MONGODB_URI);

import mongoose from 'mongoose';
import Club from '../models/Club.model.js';
import { pl, laliga, ligue1, bundesliga, seria } from '../shared/clubs.js';

const clubsData = [
  { league: 'Premier League', clubs: pl },
  { league: 'La Liga', clubs: laliga },
  { league: 'Ligue 1', clubs: ligue1 },
  { league: 'Bundesliga', clubs: bundesliga },
  { league: 'Serie A', clubs: seria },
];

const seedClubs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✓ Connected to MongoDB');

    await Club.deleteMany({});
    console.log('✓ Cleared existing clubs');

    let totalInserted = 0;
    for (const leagueData of clubsData) {
      const formattedClubs = leagueData.clubs.map((club) => ({
        name: club.club,
        league: leagueData.league,
        image: club.image,
      }));

      const inserted = await Club.insertMany(formattedClubs);
      totalInserted += inserted.length;
      console.log(`✓ Inserted ${inserted.length} clubs from ${leagueData.league}`);
    }

    console.log(`\n✓ Successfully seeded ${totalInserted} clubs to MongoDB`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding clubs:', error.message);
    process.exit(1);
  }
};

seedClubs();