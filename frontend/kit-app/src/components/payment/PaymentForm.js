import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentForm = ({ totalAmount}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const { cartItems} = location.state || {}; // Destructure c
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log('Total Amount for Payment frontend:', totalAmount); // Log the total amount for verification
  
    try {
      // Create a payment intent
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount  }) // amount in cents
      });
  
      console.log('Payment Intent Response:', response); // Log the payment intent response
  
      const { clientSecret } = await response.json();
      console.log('Client Secret:', clientSecret); // Log the client secret
  
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }
  
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.log('Stripe Payment Error:', error); // Log any errors from Stripe
        throw new Error(error.message);
      }
  
      console.log("cart items in payment", cartItems)
      if (paymentIntent.status === 'succeeded') {
        // Prepare to send purchase data to the backend
        const purchaseResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/purchase`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: localStorage.getItem('userId'), // Retrieve userId from local storage
            cartItems: cartItems.map((item) => ({
              jerseyId: item.jerseyId,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
              type: item.type,
              rating: item.rating
            }))
          }),
        });
  
        console.log('Purchase Response:', purchaseResponse); // Log the purchase response

        // Check if purchase was successful
        if (!purchaseResponse.ok) {
          throw new Error('Failed to process purchase');
        }

        alert('Payment successful and purchase confirmed!');
        navigate('/success'); // Navigate to a success page
      }
    } catch (error) {
      setError(error.message); // Update error state to display
    } finally {
      setLoading(false); // Reset loading state
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
