// backend/database/models/Club.js

import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    league: {
      type: String,
      required: true,
      enum: ['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Serie A'],
    },
    image: {
      type: String,
      required: true,
      // Path format: "/clubs/arsenal.png"
    },
  },
  { timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);

export default Club;