import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin } from './store/authStore.js';
import './admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      navigate('/admin');
    } else {
      setError('Invalid admin password.');
    }
  };

  return (
    <main className="ku-admin-login">
      <form className="ku-admin-login-card" onSubmit={handleSubmit}>
        <Link to="/home" className="ku-admin-back">← Back to store</Link>
        <h1>Kit-Up Admin</h1>
        <p>Mock login (frontend only). Password is documented in admin store constants.</p>
        {error && <p className="ku-admin-error">{error}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" className="ku-btn ku-btn--primary ku-btn--block">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
