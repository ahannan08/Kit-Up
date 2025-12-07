import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import * as cartCtrl from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authMiddleware(), cartCtrl.getUserCart);
router.post("/add", authMiddleware(), cartCtrl.addItem);
router.post("/remove", authMiddleware(), cartCtrl.removeItem);
router.post("/update", authMiddleware(), cartCtrl.updateItemQty);
router.post("/clear", authMiddleware(), cartCtrl.clearUserCart);

export default router;
