// components/CheckoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    console.log('Cart Items in cart frontend:', cartItems); // Log cart items
    console.log('Total Amount in cart frontend:', totalAmount); // Log the calculated total amount

    if (totalAmount === 0) {
      alert("Your cart is empty. Please add some items to proceed.");
      return;
    }

    // Redirect to the Checkout page with the total amount and cart items
    navigate('/checkout', { state: { totalAmount, cartItems } });
  };

  return (
    <div className="checkout-section">
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutButton;
