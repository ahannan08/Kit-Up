import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import '../styles/header.css'; // Import CSS file for styling
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = ({ isLoggedIn, setIsLoggedIn }) => {

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in based on your authentication logic
    // You may use the token stored in localStorage or any other method
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
       
       
        {isLoggedIn ? (
          <>
           <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to="/myorders" className="nav-link">Orders</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
