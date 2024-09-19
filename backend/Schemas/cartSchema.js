import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jerseyId: { type: Number, required: true }, 
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true },
  price : {type: Number, required : true}
});

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };
