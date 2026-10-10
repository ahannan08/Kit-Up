import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
  },
  { collection: 'leagues' }
);

const League = mongoose.model('League', leagueSchema);

export { League };
