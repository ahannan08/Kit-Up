import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  ],
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
