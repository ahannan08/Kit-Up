import mongoose from 'mongoose';

const jerseySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    legacyId: { type: Number, required: true, unique: true },
    clubName: { type: String, required: true, index: true },
    type: { type: String, required: true, enum: ['Home', 'Away'] },
    price: { type: Number, required: true },
    rating: { type: Number, default: 3 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
  },
  { collection: 'jerseys' }
);

const Jersey = mongoose.model('Jersey', jerseySchema);

export { Jersey };
