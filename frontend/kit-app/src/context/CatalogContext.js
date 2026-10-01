import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ensureCatalogSeeded, getStorefrontCatalog } from '../admin/store/catalogStore.js';
import { CATALOG_UPDATED_EVENT } from '../admin/store/constants.js';

const CatalogContext = createContext(null);

export const CatalogProvider = ({ children }) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    ensureCatalogSeeded();
    const refresh = () => setVersion((v) => v + 1);
    window.addEventListener(CATALOG_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, refresh);
  }, []);

  const value = useMemo(() => {
    const { leagues, allJerseys } = getStorefrontCatalog();
    const totalClubs = leagues.reduce((sum, league) => sum + league.clubs.length, 0);

    const findClub = (clubName) => {
      for (const league of leagues) {
        const club = league.clubs.find((c) => c.club === clubName);
        if (club) return { ...club, league };
      }
      return null;
    };

    const jerseysForClub = (clubName) =>
      allJerseys.filter((jersey) => jersey.club === clubName);

    const jerseysForLeague = (league) => {
      const names = new Set(league.clubs.map((c) => c.club));
      return allJerseys.filter((jersey) => names.has(jersey.club));
    };

    return {
      leagues,
      allJerseys,
      totalClubs,
      findClub,
      jerseysForClub,
      jerseysForLeague,
      version,
    };
  }, [version]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return ctx;
};
