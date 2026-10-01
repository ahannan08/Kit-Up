import React, { useState, useEffect } from 'react';
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/order/myorders/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

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
