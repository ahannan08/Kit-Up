import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';
import { recordCheckoutAttempt } from '../../admin/store/eventsStore.js';
import { getCheckoutUser, snapshotCart } from '../../admin/utils/checkoutTracking.js';
import './checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const location = useLocation();
  const { totalAmount, cartItems } = location.state || {};

  useEffect(() => {
    if (!cartItems?.length) return;
    const user = getCheckoutUser();
    recordCheckoutAttempt({
      ...user,
      stage: 'started',
      cartSnapshot: snapshotCart(cartItems),
      totalAmount: totalAmount || 0,
    });
    // Log once when checkout page opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Complete Your Payment</h1>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cartItems?.map((item, index) => (
          <p key={index} className="cart-item">
            <span>{item.type}</span>
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
    </div>
  );
};

export default Checkout;
