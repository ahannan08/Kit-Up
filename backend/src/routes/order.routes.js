import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { createOrder, myOrders, orderDetails } from "../controllers/order.controller.js";

const router = Router();

router.post("/", auth(), createOrder);
router.get("/", auth(), myOrders);
router.get("/:id", auth(), orderDetails);

export default router;
