// components/Quantity.js
import React from 'react';

const Quantity = ({ quantity, onQuantityChange }) => {
  const handleIncrease = () => {
    onQuantityChange(1); // Increase quantity by 1
  };

  const handleDecrease = () => {
    onQuantityChange(-1); // Decrease quantity by 1
  };

  return (
    <div className="cart-item-quantity">
      Quantity: 
      <button onClick={handleDecrease}>-</button>
      {quantity}
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default Quantity;
