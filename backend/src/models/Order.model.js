import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  priceAtOrder: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],

  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD"], default: "COD" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },

  address: {
    name: String,
    phone: String,
    line1: String,
    city: String,
    state: String,
    pincode: String
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
