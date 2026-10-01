import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home.js';
import Display from './components/jerseys/display/Display.js';
import Header from './components/header/Header.js';
import Details from './components/jerseys/details/Details.js';
import Cart from './components/Cart/Cart.js';
import Register from './components/auth/register/Register.js';
import Login from './components/auth/login/Login.js';
import Orders from './components/orders/Orders.js';
import Results from './components/Results.js';
import Success from './pages/Success.js';
import ScrollToTop from './components/common/ScrollToTop.js';
import Checkout from './components/payment/Checkout.js';
import IntroSplash from './components/common/IntroSplash.js';
import { useCallback, useEffect, useState } from 'react';
import { CatalogProvider } from './context/CatalogContext.js';
import AdminLogin from './admin/AdminLogin.js';
import AdminLayout from './admin/AdminLayout.js';
import ProtectedRoute from './admin/ProtectedRoute.js';
import Dashboard from './admin/pages/Dashboard.js';
import LeaguesPage from './admin/pages/LeaguesPage.js';
import ClubsPage from './admin/pages/ClubsPage.js';
import JerseysPage from './admin/pages/JerseysPage.js';
import PurchasesPage from './admin/pages/PurchasesPage.js';
import AttemptsPage from './admin/pages/AttemptsPage.js';

const INTRO_STORAGE_KEY = 'kitup_intro_home_v1';

const introAlreadySeen = () => {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

function AppRoutes({ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm, hideForIntro }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div className={hideForIntro ? 'ku-app-behind-intro' : undefined} aria-hidden={hideForIntro || undefined}>
      {!isAdminRoute && (
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
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
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/home') {
      setShowIntro(false);
      return;
    }
    setShowIntro(!introAlreadySeen());
  }, [location.pathname]);

  useEffect(() => {
    if (!showIntro) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showIntro]);

  const completeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  }, []);

  const hideForIntro = showIntro && location.pathname === '/home';

  return (
    <CatalogProvider>
      <div className="App">
        {showIntro && <IntroSplash onComplete={completeIntro} />}
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          hideForIntro={hideForIntro}
        />
      </div>
    </CatalogProvider>
  );
}

export default App;
