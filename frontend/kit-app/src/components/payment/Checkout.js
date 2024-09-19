// components/Checkout.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';

// Load the Stripe public key from the environment variable
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
console.log('Stripe Public Key in checkout:', process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const location = useLocation();
  const { totalAmount, cartItems } = location.state || {}; // Use optional chaining to avoid errors

  console.log('Received Total Amount in checkout:', totalAmount); // Log to verify
  console.log('Received Cart Items in checkout:', cartItems); // Log 

  return (
    <Elements stripe={stripePromise}>
      <h1>Complete your payment</h1>
      <PaymentForm totalAmount={totalAmount} cartItems={cartItems} />
    </Elements>
  );
};

export default Checkout;
