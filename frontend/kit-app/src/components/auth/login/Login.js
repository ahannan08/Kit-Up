import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, userId } = data.user;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', data.user?.name || formData.email.split('@')[0]);
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed. Check your email and password.');
      }
    } catch (err) {
      setError('Could not reach the server. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ku-auth-page">
      <div className="ku-auth-shell">
        <aside className="ku-auth-aside">
          <Link to="/" className="ku-brand ku-brand--light">
            <span className="ku-brand-mark">K</span>
            <span>Kit-Up</span>
          </Link>
          <h1>Welcome back</h1>
          <p>Sign in to browse kits, save your cart, and track orders across Europe&apos;s top leagues.</p>
        </aside>

        <div className="ku-auth-card-wrap">
          <form className="ku-auth-card" onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <p className="ku-auth-sub">Use the email and password from your account.</p>

            {error && <p className="ku-auth-error" role="alert">{error}</p>}

            <div className="ku-auth-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="ku-auth-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="ku-btn ku-btn--primary ku-btn--block" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="ku-auth-foot">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
