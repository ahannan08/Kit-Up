import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
//import { mongoURI, port } from "./config.js";
import authRouter from "./Routes/authRoutes.js"
import clubRouter from './Routes/clubRoutes.js';
import paymentRouter from './Routes/paymentRoutes.js';
import cartRouter from './Routes/cartRoutes.js';
import orderRouter from './Routes/orderRoutes.js';

const app = express();

// Get the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/clubs", express.static(path.join(__dirname, "shared/clubs")));

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/auth", authRouter);
app.use("/api/clubs", clubRouter);
app.use('/api/payment', paymentRouter);
app.use("/api", cartRouter);
app.use("/order", orderRouter);




// MongoDB Connection

const mongoURI = process.env.MONGO_URI; // Ensure this matches your .env key
console.log("the url is " , mongoURI)
const port = process.env.PORT || 3009;

// Check if mongoURI is defined
if (!mongoURI) {
  console.error("❌ MONGO_URI is not set in the environment variables.");
  process.exit(1); // Exit the process if no MongoDB URI is set
}

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
// Port
app.listen(port, () => {
  console.log("Server is running on port", port);
});
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit the process if MongoDB connection fails
});
