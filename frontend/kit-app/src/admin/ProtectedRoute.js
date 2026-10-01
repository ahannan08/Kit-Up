import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from './store/authStore.js';

const ProtectedRoute = ({ children }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
