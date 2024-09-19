import mongoose from 'mongoose';

const jerseySchema = new mongoose.Schema({

  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Jersey = mongoose.model('Jersey', jerseySchema);

export { Jersey };
