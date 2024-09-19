import express from 'express';
import {purchase,} from '../Controllers/purchaseController.js';
import { createPaymentIntent } from '../Controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.put('/purchase', purchase);
paymentRouter.post('/create-payment-intent', createPaymentIntent);

export default paymentRouter;
