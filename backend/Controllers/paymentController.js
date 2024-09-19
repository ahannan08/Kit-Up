import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first


console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  console.log('Received amount in backend, payment controller:', amount); // Log the received amount

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export {createPaymentIntent}