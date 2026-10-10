import Stripe from 'stripe';
import { env } from '../config/env.js';

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

const createPaymentIntent = async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ message: 'Stripe is not configured' });
  }

  const { amount } = req.body;
  const amountPaise = Math.round(Number(amount));
  if (!amountPaise || amountPaise < 50) {
    return res.status(400).json({ message: 'amount (paise) must be at least 50' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountPaise,
    currency: 'inr',
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

export { createPaymentIntent };
