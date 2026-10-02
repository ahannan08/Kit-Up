import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from '../home/Home.js';
import Display from '../jerseys/display/Display.js';
import Header from '../header/Header.js';
import Details from '../jerseys/details/Details.js';
import Cart from '../Cart/Cart.js';
import Register from '../auth/register/Register.js';
import Login from '../auth/login/Login.js';
import Orders from '../orders/Orders.js';
import Results from '../Results.js';
import Success from '../../pages/Success.js';
import ScrollToTop from '../common/ScrollToTop.js';
import Checkout from '../payment/Checkout.js';
import AdminLogin from '../../admin/AdminLogin.js';
import AdminLayout from '../../admin/AdminLayout.js';
import ProtectedRoute from '../../admin/ProtectedRoute.js';
import Dashboard from '../../admin/pages/Dashboard.js';
import LeaguesPage from '../../admin/pages/LeaguesPage.js';
import ClubsPage from '../../admin/pages/ClubsPage.js';
import JerseysPage from '../../admin/pages/JerseysPage.js';
import PurchasesPage from '../../admin/pages/PurchasesPage.js';
import AttemptsPage from '../../admin/pages/AttemptsPage.js';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm, hideForIntro }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div
        className={hideForIntro ? 'ku-app-behind-intro' : undefined}
        aria-hidden={hideForIntro || undefined}
      >
        {!isAdminRoute && (
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/display/:club" element={<Display />} />
          <Route path="/jersey-details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/results" element={<Results />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myorders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="leagues" element={<LeaguesPage />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="jerseys" element={<JerseysPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="attempts" element={<AttemptsPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
