// backend/src/database/models/Jersey.model.js

import mongoose from 'mongoose';

const jerseySchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    clubName: {
      type: String,
      required: true,
    },
    league: {
      type: String,
      required: true,
      enum: ['Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Serie A'],
    },
    type: {
      type: String,
      required: true,
      enum: ['Home', 'Away'],
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Jersey = mongoose.model('Jersey', jerseySchema);

export default Jersey;