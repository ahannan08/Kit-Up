import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Quantity from './Quantity';
import CheckoutButton from './CheckoutButton';
import useFetchCart from '../../hooks/useFetchCart';
import Footer from '../common/Footer';
import './cart.css';

const Cart = () => {
  const userId = localStorage.getItem('userId');
  const { cartItems, setCartItems, userBalance, loading } = useFetchCart(userId);

  const updateQuantity = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          const newQuantity = Math.max(item.quantity + change, 0);
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          };
        }
        return item;
      })
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <main className="ku-page ku-cart-page">
        <div className="ku-container ku-cart-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading your cart…</span>
        </div>
      </main>
    );
  }

  return (
    <main className="ku-page ku-cart-page">
      <div className="ku-container">
        <header className="ku-cart-head">
          <div>
            <span className="ku-eyebrow">Your bag</span>
            <h1 className="ku-section-title">Cart</h1>
          </div>
          <div className="ku-cart-balance">
            <span>Balance</span>
            <strong>${userBalance}</strong>
          </div>
        </header>

        {cartItems.length === 0 ? (
          <div className="ku-empty ku-cart-empty">
            <span className="ku-empty-icon">
              <FontAwesomeIcon icon={faBagShopping} />
            </span>
            <h2>Your cart is empty</h2>
            <p>Browse clubs and add home or away kits to get started.</p>
            <Link to="/home" className="ku-btn ku-btn--primary">Shop kits</Link>
          </div>
        ) : (
          <div className="ku-cart-layout">
            <ul className="ku-cart-list">
              {cartItems.map((item) => (
                <li key={item._id} className="ku-cart-row">
                  <div className="ku-cart-row-media">
                    <img src={item.image} alt={`${item.type} jersey`} />
                  </div>
                  <div className="ku-cart-row-body">
                    <span className={`ku-chip ku-chip--accent`}>{item.type}</span>
                    <p className="ku-cart-row-meta">Rating {item.rating} · ${item.price} each</p>
                    <Quantity
                      quantity={item.quantity}
                      onQuantityChange={(change) => updateQuantity(item._id, change)}
                    />
                  </div>
                  <div className="ku-cart-row-price">${item.totalPrice ?? item.price * item.quantity}</div>
                </li>
              ))}
            </ul>

            <aside className="ku-cart-summary">
              <h2>Order summary</h2>
              <dl>
                <div>
                  <dt>Items</dt>
                  <dd>{itemCount}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>${subtotal}</dd>
                </div>
                <div className="ku-cart-summary-total">
                  <dt>Total</dt>
                  <dd>${subtotal}</dd>
                </div>
              </dl>
              <CheckoutButton cartItems={cartItems} />
              <Link to="/home" className="ku-btn ku-btn--ghost ku-btn--block">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
