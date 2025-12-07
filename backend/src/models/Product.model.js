import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: { type: String, required: true },
    type: { type: String, enum: ["home", "away", "third", "special"], required: true },
    league: { type: String },

    price: { type: Number, required: true },

    images: { type: [String], default: [] },

    stock: { type: Number, default: 0 },

    availableSizes: { type: [String], default: ["S", "M", "L", "XL"] },

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
