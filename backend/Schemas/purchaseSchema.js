import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  jerseyId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true }
});

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itemSchema], 
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export { Purchase };
