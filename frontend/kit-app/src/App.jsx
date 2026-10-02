import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CatalogProvider } from './context/CatalogContext.js';
import IntroSplash from './components/common/IntroSplash.js';
import AppRoutes from './components/app/AppRoutes.jsx';

const INTRO_STORAGE_KEY = 'kitup_intro_home_v1';

const introAlreadySeen = () => {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const isHomePath = (pathname) => pathname === '/' || pathname === '/home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!isHomePath(location.pathname)) {
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

  const hideForIntro = showIntro && isHomePath(location.pathname);

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
};

export default App;
