import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import SearchBar from '../home/searchBar/SearchBar';
import FilterComponent from '../home/filter/FilterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ type: '', rating: 0, minPrice: 0, maxPrice: 1000 });
  const [showPanel, setShowPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const applyFilters = () => {
    navigate('/results', { state: { filters } });
    setShowPanel(false);
  };

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <nav className="navbar">
      

      {!isMobile ? (
        <>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li>
                <li className="nav-item"><Link to="/myorders" className="nav-link">Orders</Link></li>
                <li className="nav-item"><button className="nav-link" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
              </>
            )}
          </ul>

          <div className="navbar-search">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="filter-icon" onClick={() => setShowPanel(true)}>
              <FontAwesomeIcon icon={faFilter} />
            </div>

            {showPanel && (
              <FilterComponent
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
                closePanel={() => setShowPanel(false)}
              />
            )}
          </div>
        </>
      ) : (
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
        </div>
      )}

      {isMobile && showMobileMenu && (
        <div className="mobile-menu">
          <ul className="mobile-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link to="/home" className="nav-link" onClick={toggleMobileMenu}>Home</Link></li>
                <li className="nav-item"><Link to="/cart" className="nav-link" onClick={toggleMobileMenu}>Cart</Link></li>
                <li className="nav-item"><Link to="/myorders" className="nav-link" onClick={toggleMobileMenu}>Orders</Link></li>
                <li className="nav-item"><button className="nav-link" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/" className="nav-link" onClick={toggleMobileMenu}>Login</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link" onClick={toggleMobileMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
