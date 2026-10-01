import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { recordCheckoutAttempt, recordPurchase } from '../../admin/store/eventsStore.js';
import { getCatalog } from '../../admin/store/catalogStore.js';
import { getCheckoutUser, snapshotCart } from '../../admin/utils/checkoutTracking.js';

const clubForJersey = (jerseyId) => {
  const kit = getCatalog().jerseys.find((j) => j._id === String(jerseyId));
  return kit?.clubName || '';
};

const enrichItems = (cartItems) =>
  cartItems.map((item) => ({
    jerseyId: item.jerseyId,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
    type: item.type,
    rating: item.rating,
    clubName: item.clubName || clubForJersey(item.jerseyId),
  }));

const PaymentForm = ({ totalAmount, cartItems = [] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = getCheckoutUser();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        const purchaseResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/purchase`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: localStorage.getItem('userId'),
            cartItems: cartItems.map((item) => ({
              jerseyId: item.jerseyId,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
              type: item.type,
              rating: item.rating,
            })),
          }),
        });

        if (!purchaseResponse.ok) {
          throw new Error('Failed to process purchase');
        }

        recordPurchase({
          userId: user.userId,
          userEmail: user.userEmail,
          userName: user.userName,
          items: enrichItems(cartItems),
          totalPrice: totalAmount,
        });

        navigate('/success');
      }
    } catch (err) {
      setError(err.message);
      recordCheckoutAttempt({
        userId: user.userId,
        userEmail: user.userEmail,
        stage: 'payment_failed',
        cartSnapshot: snapshotCart(cartItems),
        totalAmount: totalAmount || 0,
        errorMessage: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
