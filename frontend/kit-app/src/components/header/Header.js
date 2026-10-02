import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBoxOpen,
  faHouse,
  faRightFromBracket,
  faSliders,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../home/searchBar/SearchBar';
import FilterComponent from '../home/filter/FilterComponent';
import '../common/common.css';
import './header.css';

const defaultFilters = { type: '', rating: 0, minPrice: 0, maxPrice: 1000 };

const Header = ({ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(defaultFilters);
  const [showPanel, setShowPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowPanel(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!showPanel) return undefined;
    const onPointerDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowPanel(false);
    };
    const onKeyDown = (e) => e.key === 'Escape' && setShowPanel(false);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showPanel]);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (location.pathname !== '/') navigate('/');
  };

  const applyFilters = () => {
    navigate('/results', { state: { filters } });
    setShowPanel(false);
  };

  const links = isLoggedIn
    ? [
        { to: '/', label: 'Home', icon: faHouse, end: true },
        { to: '/cart', label: 'Cart', icon: faBagShopping },
        { to: '/myorders', label: 'Orders', icon: faBoxOpen },
      ]
    : [];

  const navClass = ({ isActive }) => `ku-nav-link ${isActive ? 'is-active' : ''}`;

  return (
    <header className={`ku-nav ${scrolled ? 'is-scrolled' : ''} ${showMobileMenu ? 'is-open' : ''}`}>
      <div className="ku-container ku-nav-inner">
        <Link to="/" className="ku-brand ku-brand--image">
          <img src={`${process.env.PUBLIC_URL}/kitup-logo-light-bg.png`} alt="Kit-Up" className="ku-brand-img" />
        </Link>

        {isLoggedIn && (
          <nav className="ku-nav-links" aria-label="Main">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="ku-nav-actions">
          {isLoggedIn ? (
            <>
              <div className="ku-nav-search">
                <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
              </div>

              <div className="ku-filter-wrap" ref={filterRef}>
                <button
                  type="button"
                  className={`ku-icon-btn ${showPanel ? 'is-active' : ''}`}
                  onClick={() => setShowPanel((open) => !open)}
                  aria-label="Filter jerseys"
                  aria-expanded={showPanel}
                >
                  <FontAwesomeIcon icon={faSliders} />
                </button>
                {showPanel && (
                  <FilterComponent
                    filters={filters}
                    setFilters={setFilters}
                    applyFilters={applyFilters}
                    resetFilters={() => setFilters(defaultFilters)}
                    closePanel={() => setShowPanel(false)}
                  />
                )}
              </div>

              <Link to="/cart" className="ku-icon-btn ku-hide-mobile" aria-label="Cart">
                <FontAwesomeIcon icon={faBagShopping} />
              </Link>

              <button
                type="button"
                className="ku-icon-btn ku-hide-mobile"
                onClick={handleLogout}
                aria-label="Log out"
                title="Log out"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </>
          ) : (
            <div className="ku-nav-auth ku-hide-mobile">
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <Link to="/register" className="ku-btn ku-btn--dark ku-btn--sm">Register</Link>
            </div>
          )}

          <button
            type="button"
            className="ku-icon-btn ku-burger"
            onClick={() => setShowMobileMenu((open) => !open)}
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={showMobileMenu}
          >
            <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
          </button>
        </div>
      </div>

      <div className="ku-drawer" aria-hidden={!showMobileMenu}>
        {isLoggedIn && (
          <div className="ku-drawer-search">
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
          </div>
        )}
        <nav className="ku-drawer-links">
          {isLoggedIn ? (
            <>
              {links.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={navClass}
                  style={{ '--ku-i': i }}
                >
                  <FontAwesomeIcon icon={link.icon} fixedWidth />
                  {link.label}
                </NavLink>
              ))}
              <button
                type="button"
                className="ku-nav-link ku-drawer-logout"
                style={{ '--ku-i': links.length }}
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass} style={{ '--ku-i': 0 }}>Login</NavLink>
              <NavLink to="/register" className={navClass} style={{ '--ku-i': 1 }}>Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
