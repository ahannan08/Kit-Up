import React from 'react';
import { Link } from 'react-router-dom';
import { leagues } from '../../data/catalog';
import './common.css';

const Footer = () => (
  <footer className="ku-footer">
    <div className="ku-container ku-footer-grid">
      <div className="ku-footer-brand">
        <Link to="/home" className="ku-brand ku-brand--light">
          <span className="ku-brand-mark">K</span>
          <span>Kit-Up</span>
        </Link>
        <p>Jerseys from Europe's top five leagues.</p>
      </div>

      <div>
        <h4>Leagues</h4>
        <ul>
          {leagues.map((league) => (
            <li key={league.name}>
              <Link to="/home" state={{ league: league.name }}>{league.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Account</h4>
        <ul>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/myorders">My orders</Link></li>
          <li><Link to="/register">Create account</Link></li>
        </ul>
      </div>
    </div>
    <div className="ku-container ku-footer-bottom">
      <span>© {new Date().getFullYear()} Kit-Up. All rights reserved.</span>
      <span>Payments secured by Stripe</span>
    </div>
  </footer>
);

export default Footer;
