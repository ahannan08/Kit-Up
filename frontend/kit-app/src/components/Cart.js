import React, { useState, useEffect } from 'react';
import "../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userBalance, setUserBalance] = useState(1400); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3009/auth/cart/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cartItems);
          setUserBalance(data.userBalance);
        } else {
          console.error('Failed to fetch cart items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDecrease = (itemId) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          return { ...updatedItem, totalPrice: updatedItem.quantity * updatedItem.price };
        }
        return item;
      });
    });
  };

  const handleIncrease = (itemId) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          return { ...updatedItem, totalPrice: updatedItem.quantity * updatedItem.price };
        }
        return item;
      });
    });
  };

  const handlePurchase = async (item) => {
    try {
      // Calculate the total price of the item
      const totalPrice = item.price * item.quantity;
  
      // Check if the user has enough balance to make the purchase
      if (userBalance < totalPrice) {
        alert('Insufficient balance. Cannot purchase.');
        return;
      }
  
      const response = await fetch(`http://localhost:3009/auth/cart/purchase`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           userId: localStorage.getItem('userId'), 
           itemId: item._id,
           jerseyId: item.jerseyId,
        quantity: item.quantity,
        image: item.image,
        type: item.type,
        rating: item.rating,
        price: item.price,
      totalPrice: item.price * item.quantity }),
      });
  
      if (response.ok) {
        // Update local user balance
        
        setUserBalance(prevBalance => prevBalance - totalPrice);
        // Remove the purchased item from the cart
        setCartItems(prevItems => prevItems.filter(cartItem => cartItem._id !== item._id));
        alert('Item purchased successfully!');
      } else {
        console.error('Failed to purchase item:', response.statusText);
      }
    } catch (error) {
      console.error('Error purchasing item:', error);
    }
  };
  

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
                <div className="cart-item-quantity">
                  Quantity: 
                  <button onClick={() => handleDecrease(item._id)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrease(item._id)}>+</button>
                </div>
              </div>
              <div className={`cart-item-price ${userBalance < item.totalPrice ? 'insufficient-balance' : ''}`}>
                Price: <span className={userBalance < item.totalPrice ? 'insufficient-balance' : ''}>${item.totalPrice}</span>
              </div>
              <button onClick={() => handlePurchase(item)}>Purchase</button>
            </li>
          ))
        ) : (
          <li className="empty-cart-message">Your cart is empty</li>
        )}
      </ul>
    </div>
  );
};

export default Cart;
