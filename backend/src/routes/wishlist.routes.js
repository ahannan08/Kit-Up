import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as wlCtrl from "../controllers/wishlist.controller.js";

const router = Router();

router.get("/", authMiddleware(), wlCtrl.getUserWishlist);
router.post("/toggle", authMiddleware(), wlCtrl.toggleItem);

export default router;
