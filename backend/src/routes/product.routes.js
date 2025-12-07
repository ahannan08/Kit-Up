import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected (admin only)
router.post("/", authMiddleware(["admin"]), createProduct);
router.put("/:id", authMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware(["admin"]), deleteProduct);

export default router;
