import express from 'express';
import { getOrders } from '../Controllers/orderController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const orderRouter = express.Router();

orderRouter.get('/myorders/:userId', asyncHandler(getOrders));

export default orderRouter;
