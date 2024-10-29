// components/Checkout.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';
import './checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const location = useLocation();
  const { totalAmount, cartItems } = location.state || {};

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Complete Your Payment</h1>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cartItems?.map((item, index) => (
          <p key={index} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </p>
        ))}
        <p className="total-amount">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <div className="payment-form">
          <PaymentForm totalAmount={totalAmount} cartItems={cartItems} />
        </div>
      </Elements>
      <button className="pay-button">Pay Now</button>
    </div>
  );
};

export default Checkout;
