// components/CheckoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (totalAmount === 0) {
      alert('Your cart is empty. Please add some items to proceed.');
      return;
    }

    navigate('/checkout', { state: { totalAmount, cartItems } });
  };

  return (
    <div className="checkout-section">
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutButton;
