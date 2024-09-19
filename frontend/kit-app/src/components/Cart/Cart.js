import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quantity from './Quantity';
import CheckoutButton from './CheckoutButton';
import useFetchCart from '../../hooks/useFetchCart'; // Import the custom hook
import "./cart.css";

const Cart = () => {
  const userId = localStorage.getItem('userId');
  const { cartItems, setCartItems, userBalance, loading } = useFetchCart(userId); // Use the custom hook
  const navigate = useNavigate();

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId) {
          const newQuantity = Math.max(item.quantity + change, 0); // Prevent negative quantity
          return { 
            ...item, 
            quantity: newQuantity,
            totalPrice: newQuantity * item.price // Update totalPrice based on new quantity
          };
        }
        return item;
      });
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="user-balance">Balance: ${userBalance}</div>
      <ul className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.type} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="cart-item-type">Type: {item.type}</div>
                <div className="cart-item-rating">Rating: {item.rating}</div>
                <Quantity 
                  quantity={item.quantity} 
                  onQuantityChange={(change) => updateQuantity(item._id, change)} 
                />
              </div>
              <div className="cart-item-price">
                Price: ${item.totalPrice}
              </div>
            </li>
          ))
        ) : (
          <li className="empty-cart-message">Your cart is empty</li>
        )}
      </ul>

      {cartItems.length > 0 && (
        <CheckoutButton cartItems={cartItems} />
      )}
    </div>
  );
};

export default Cart;
