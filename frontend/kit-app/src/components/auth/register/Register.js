import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage(data.message || 'Account created. You can log in now.');
        window.setTimeout(() => navigate('/login'), 1200);
      } else {
        setIsError(true);
        setMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setIsError(true);
      setMessage('Could not reach the server. Try again in a moment.');
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
          <h1>Join Kit-Up</h1>
          <p>Create an account to shop home and away kits, checkout securely, and view your order history.</p>
        </aside>

        <div className="ku-auth-card-wrap">
          <form className="ku-auth-card" onSubmit={handleSubmit}>
            <h2>Create account</h2>
            <p className="ku-auth-sub">It only takes a minute to get started.</p>

            {message && (
              <p className={`ku-auth-error ${isError ? '' : 'ku-auth-error--ok'}`} role="status">
                {message}
              </p>
            )}

            <div className="ku-auth-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

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
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="ku-btn ku-btn--primary ku-btn--block" disabled={loading}>
              {loading ? 'Creating account…' : 'Register'}
            </button>

            <p className="ku-auth-foot">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
