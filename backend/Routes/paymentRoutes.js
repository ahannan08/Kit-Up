import express from 'express';
import { purchase } from '../Controllers/purchaseController.js';
import { createPaymentIntent } from '../Controllers/paymentController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', asyncHandler(createPaymentIntent));
paymentRouter.put('/purchase', asyncHandler(purchase));

export default paymentRouter;
