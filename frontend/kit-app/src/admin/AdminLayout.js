import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logoutAdmin } from './store/authStore.js';
import './admin.css';

const links = [
  { to: '/admin', end: true, label: 'Overview' },
  { to: '/admin/leagues', label: 'Leagues' },
  { to: '/admin/clubs', label: 'Clubs' },
  { to: '/admin/jerseys', label: 'Jerseys' },
  { to: '/admin/purchases', label: 'Purchases' },
  { to: '/admin/attempts', label: 'Attempts' },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="ku-admin">
      <aside className="ku-admin-sidebar">
        <div className="ku-admin-sidebar-head">
          <span className="ku-admin-badge">Admin</span>
          <strong>Kit-Up</strong>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="ku-admin-logout" onClick={handleLogout}>
          Log out
        </button>
      </aside>
      <div className="ku-admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
