import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setIsLoggedIn }) => {
    // Accept setIsLoggedIn as a prop

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("submit buttn hit")
    e.preventDefault();

    try {
      console.log("API URL:", process.env.REACT_APP_API_URL);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, extract and store the token and userId
        const { token, userId } = data.user;

        // Store the token in local storage
        localStorage.setItem('authToken', token);
        console.log('Token stored:', token);

        // Save userId in local storage
        localStorage.setItem('userId', userId);
        console.log('UserId stored:', userId);
        console.log("Is setIsLoggedIn defined?", typeof setIsLoggedIn);

        // Set isLoggedIn to true
         // Update the state here

        // Navigate to the home page
        navigate('/home');
        setIsLoggedIn(true);
      } else {
        // Handle unsuccessful login
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
