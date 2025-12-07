// backend/src/database/seeds/seedJerseys.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import Club from '../models/Club.model.js';
import Jersey from '../models/Jersey.model.js';

// Jersey data with image PATHS instead of imports
const jerseysData = [
  // Premier League
  { club: "Arsenal", type: "Home", image: "/jerseys/pl/ars1.jpg", price: 600 },
  { club: "Arsenal", type: "Away", image: "/jerseys/pl/ars2.jpg", price: 400 },
  { club: "Chelsea", type: "Home", image: "/jerseys/pl/che1.jpg", price: 600 },
  { club: "Chelsea", type: "Away", image: "/jerseys/pl/che2.jpg", price: 400 },
  { club: "Manchester United", type: "Home", image: "/jerseys/pl/1.jpg", price: 600 },
  { club: "Manchester United", type: "Away", image: "/jerseys/pl/utd2.jpg", price: 400 },
  { club: "Manchester City", type: "Home", image: "/jerseys/pl/city1.jpg", price: 600 },
  { club: "Manchester City", type: "Away", image: "/jerseys/pl/city2.jpg", price: 400 },
  { club: "Tottenham", type: "Home", image: "/jerseys/pl/spur1.jpg", price: 600 },
  { club: "Tottenham", type: "Away", image: "/jerseys/pl/spur2.jpg", price: 400 },
  { club: "NewCastle United", type: "Home", image: "/jerseys/pl/new1.jpg", price: 600 },
  { club: "NewCastle United", type: "Away", image: "/jerseys/pl/new2.jpg", price: 600 },
  { club: "West Ham", type: "Home", image: "/jerseys/pl/west1.jpg", price: 600 },
  { club: "West Ham", type: "Away", image: "/jerseys/pl/west2.jpg", price: 400 },
  { club: "Aston Villa", type: "Home", image: "/jerseys/pl/aston1.jpg", price: 600 },
  { club: "Aston Villa", type: "Away", image: "/jerseys/pl/aston2.jpg", price: 400 },
  { club: "Liverpool", type: "Home", image: "/jerseys/pl/liv1.jpg", price: 600 },
  { club: "Liverpool", type: "Away", image: "/jerseys/pl/liv2.jpg", price: 400 },

  // Serie A
  { club: "AC Milan", type: "Home", image: "/jerseys/seria a/ac 1.jpg", price: 600 },
  { club: "AC Milan", type: "Away", image: "/jerseys/seria a/ac 2.jpg", price: 1000 },
  { club: "Atalanta", type: "Home", image: "/jerseys/seria a/atlanta1.jpg", price: 600 },
  { club: "Atalanta", type: "Away", image: "/jerseys/seria a/atlanta2.jpg", price: 400 },
  { club: "Juventus", type: "Home", image: "/jerseys/seria a/juve1.jpg", price: 600 },
  { club: "Juventus", type: "Away", image: "/jerseys/seria a/juve2.jpg", price: 400 },
  { club: "Lazio", type: "Home", image: "/jerseys/seria a/lazio1.jpg", price: 600 },
  { club: "Lazio", type: "Away", image: "/jerseys/seria a/lazio2.jpg", price: 400 },
  { club: "Inter Milan", type: "Home", image: "/jerseys/seria a/milan1.jpg", price: 600 },
  { club: "Inter Milan", type: "Away", image: "/jerseys/seria a/milan2.jpg", price: 400 },
  { club: "Napoli", type: "Home", image: "/jerseys/seria a/nap1.jpg", price: 600 },
  { club: "Napoli", type: "Away", image: "/jerseys/seria a/nap2.jpg", price: 400 },
  { club: "Roma", type: "Home", image: "/jerseys/seria a/roma1.jpg", price: 600 },
  { club: "Roma", type: "Away", image: "/jerseys/seria a/roma2.jpg", price: 400 },

  // La Liga
  { club: "Athletic Bilbao", type: "Home", image: "/jerseys/laliga/ath1.jpg", price: 600 },
  { club: "Athletic Bilbao", type: "Away", image: "/jerseys/laliga/ath2.jpg", price: 400 },
  { club: "Atletico Madrid", type: "Home", image: "/jerseys/laliga/atm1.jpg", price: 600 },
  { club: "Atletico Madrid", type: "Away", image: "/jerseys/laliga/atm2.jpg", price: 400 },
  { club: "FC Barcelona", type: "Home", image: "/jerseys/laliga/b1.jpg", price: 600 },
  { club: "FC Barcelona", type: "Away", image: "/jerseys/laliga/b2.jpg", price: 400 },
  { club: "Real Betis", type: "Home", image: "/jerseys/laliga/betis1.jpg", price: 600 },
  { club: "Real Betis", type: "Away", image: "/jerseys/laliga/betis2.jpg", price: 400 },
  { club: "Girona FC", type: "Home", image: "/jerseys/laliga/girona1.jpg", price: 600 },
  { club: "Girona FC", type: "Away", image: "/jerseys/laliga/girona2.jpg", price: 400 },
  { club: "Real Madrid", type: "Home", image: "/jerseys/laliga/r1.jpg", price: 600 },
  { club: "Real Madrid", type: "Away", image: "/jerseys/laliga/r2.jpg", price: 400 },
  { club: "Sevilla FC", type: "Home", image: "/jerseys/laliga/sevilla1.jpg", price: 600 },
  { club: "Sevilla FC", type: "Away", image: "/jerseys/laliga/sevilla2.jpg", price: 400 },
  { club: "Villarreal CF", type: "Home", image: "/jerseys/laliga/villa1.jpg", price: 600 },
  { club: "Villarreal CF", type: "Away", image: "/jerseys/laliga/villa2.jpg", price: 400 },

  // Bundesliga
  { club: "FC Bayern Munich", type: "Home", image: "/jerseys/bundesliga/bayern1.jpg", price: 600 },
  { club: "FC Bayern Munich", type: "Away", image: "/jerseys/bundesliga/bayern2.jpg", price: 400 },
  { club: "Borussia Dortmund", type: "Home", image: "/jerseys/bundesliga/bvb1.jpg", price: 600 },
  { club: "Borussia Dortmund", type: "Away", image: "/jerseys/bundesliga/bvb2.jpg", price: 400 },
  { club: "RasenBallsport Leipzig", type: "Home", image: "/jerseys/bundesliga/rl1.jpg", price: 600 },
  { club: "RasenBallsport Leipzig", type: "Away", image: "/jerseys/bundesliga/rl2.jpg", price: 400 },
  { club: "SC Freiburg", type: "Home", image: "/jerseys/bundesliga/sc1.jpg", price: 600 },
  { club: "SC Freiburg", type: "Away", image: "/jerseys/bundesliga/sc2.jpg", price: 400 },
  { club: "Union Berlin", type: "Home", image: "/jerseys/bundesliga/union1.jpg", price: 600 },
  { club: "Union Berlin", type: "Away", image: "/jerseys/bundesliga/union2.jpg", price: 400 },
  { club: "VfL Wolfsburg", type: "Home", image: "/jerseys/bundesliga/wolf1.jpg", price: 600 },
  { club: "VfL Wolfsburg", type: "Away", image: "/jerseys/bundesliga/wolf2.jpg", price: 400 },
  { club: "Bayer Leverkusen", type: "Home", image: "/jerseys/bundesliga/b1.jpg", price: 600 },
  { club: "Bayer Leverkusen", type: "Away", image: "/jerseys/bundesliga/b2.jpg", price: 600 },
  { club: "FC Schalke 04", type: "Home", image: "/jerseys/bundesliga/sc1.jpg", price: 600 },
  { club: "FC Schalke 04", type: "Away", image: "/jerseys/bundesliga/sc2.jpg", price: 600 },

  // Ligue 1
  { club: "Paris Saint-Germain", type: "Home", image: "/jerseys/ligue1/psg1.jpg", price: 600 },
  { club: "Paris Saint-Germain", type: "Away", image: "/jerseys/ligue1/psg2.jpg", price: 400 },
  { club: "Marseille", type: "Home", image: "/jerseys/ligue1/m1.jpg", price: 600 },
  { club: "Marseille", type: "Away", image: "/jerseys/ligue1/m2.jpg", price: 400 },
  { club: "AS Monaco", type: "Home", image: "/jerseys/ligue1/monaco1.jpg", price: 600 },
  { club: "AS Monaco", type: "Away", image: "/jerseys/ligue1/monaco2.jpg", price: 400 },
  { club: "OGC Nice", type: "Home", image: "/jerseys/ligue1/nice1.jpg", price: 600 },
  { club: "OGC Nice", type: "Away", image: "/jerseys/ligue1/nice2.jpg", price: 400 },
  { club: "Lyon", type: "Home", image: "/jerseys/ligue1/nol1.jpg", price: 600 },
  { club: "Lyon", type: "Away", image: "/jerseys/ligue1/nol2.jpg", price: 400 },
  { club: "Stade Rennais", type: "Home", image: "/jerseys/ligue1/sd1.jpg", price: 600 },
  { club: "Stade Rennais", type: "Away", image: "/jerseys/ligue1/sr2.jpg", price: 400 },
];

const seedJerseys = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing jerseys
    await Jersey.deleteMany({});
    console.log('✓ Cleared existing jerseys');

    let totalInserted = 0;

    for (const jerseyData of jerseysData) {
      try {
        // Find the club by name in the database
        const club = await Club.findOne({ name: jerseyData.club });

        if (!club) {
          console.warn(`⚠️ Club not found: ${jerseyData.club}`);
          continue;
        }

        // Create jersey with clubId reference
        const jerseyDoc = {
          clubId: club._id,
          clubName: jerseyData.club,
          league: club.league,
          type: jerseyData.type,
          image: jerseyData.image,
          price: jerseyData.price,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
        };

        await Jersey.create(jerseyDoc);
        totalInserted++;
      } catch (error) {
        console.error(`❌ Error creating jersey for ${jerseyData.club}:`, error.message);
      }
    }

    console.log(`\n✓ Successfully seeded ${totalInserted} jerseys to MongoDB`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding jerseys:', error.message);
    process.exit(1);
  }
};

seedJerseys();