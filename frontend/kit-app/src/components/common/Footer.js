import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import './common.css';

const Footer = () => {
  const { leagues } = useCatalog();

  return (
    <footer className="ku-footer">
      <div className="ku-container ku-footer-grid">
        <div className="ku-footer-brand">
          <Link to="/" className="ku-brand ku-brand--light">
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
                <Link to="/" state={{ league: league.name }}>{league.name}</Link>
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
};

export default Footer;
