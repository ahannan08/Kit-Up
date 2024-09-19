import express from "express"
import {getOrders} from "../Controllers/orderController.js"
const orderRouter = express.Router()

orderRouter.get('/myorders/:userId', getOrders);

export default orderRouter;

