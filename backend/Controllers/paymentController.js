import Stripe from 'stripe';
import { env } from '../config/env.js';

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

const createPaymentIntent = async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ message: 'Stripe is not configured' });
  }

  const { amount } = req.body;
  if (!amount || amount < 50) {
    return res.status(400).json({ message: 'amount (cents) must be at least 50' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

export { createPaymentIntent };
