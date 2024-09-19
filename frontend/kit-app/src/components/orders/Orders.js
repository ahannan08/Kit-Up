import React, { useState, useEffect } from 'react';
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userBalance, setUserBalance] = useState(1400);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3009/order/myorders/${userId}`);
        console.log("response:", response)
        if (response.ok) {
          const data = await response.json();
          console.log("Orders received from backend:", data.orders); 
      
          setOrders(data.orders); // Set the orders received from the backend
          
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [userBalance]); // Add userBalance to the dependency array

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <ul className="order-list">
        {orders.length > 0 ? (
          orders.map(order => (
            <li key={order._id} className="order-item">
              <img src={order.image} alt={order.type} className="order-item-image" />
              <div className="order-item-details">
                <div className="order-item-type">Type: {order.type}</div>
                <div className="order-item-quantity">Quantity: {order.quantity}</div>
                <div className="order-item-price">Price: ${order.totalPrice}</div>
                <div className="order-item-date">Date: {new Date(order.purchaseDate).toLocaleDateString()}</div>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-orders-message">You have no orders</li>
        )}
      </ul>
    </div>
  );
};

export default Orders;
