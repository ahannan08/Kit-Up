import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    leagueId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    crestUrl: { type: String, default: '' },
  },
  { collection: 'clubs' }
);

const Club = mongoose.model('Club', clubSchema);

export { Club };
