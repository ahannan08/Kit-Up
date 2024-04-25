import mongoose from 'mongoose';

const jerseySchema = new mongoose.Schema({
  // Define the fields for your jersey schema
  // For example:
  name: { type: String, required: true },
  image: { type: String, required: true },
  // Add other fields as needed
});

const Jersey = mongoose.model('Jersey', jerseySchema);

export { Jersey };
