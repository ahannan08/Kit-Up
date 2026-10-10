import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { buildSeedCatalog } from '../admin/store/seedCatalog.js';

const CatalogContext = createContext(null);

const apiBase = () => process.env.REACT_APP_API_URL || '';

async function fetchStorefront() {
  const res = await fetch(`${apiBase()}/api/catalog/storefront`);
  if (!res.ok) {
    throw new Error(`Catalog request failed (${res.status})`);
  }
  return res.json();
}

async function importCatalogFromBrowser() {
  const payload = buildSeedCatalog();
  const res = await fetch(`${apiBase()}/api/catalog/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok && res.status !== 409) {
    throw new Error(`Catalog import failed (${res.status})`);
  }
}

export const CatalogProvider = ({ children }) => {
  const [leagues, setLeagues] = useState([]);
  const [allJerseys, setAllJerseys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await fetchStorefront();
      const needsImport =
        !data.allJerseys?.length || data.allJerseys.every((j) => !j.Image);
      if (needsImport) {
        await importCatalogFromBrowser();
        data = await fetchStorefront();
      }
      setLeagues(data.leagues || []);
      setAllJerseys(data.allJerseys || []);
    } catch (err) {
      const base = apiBase() || '(REACT_APP_API_URL not set)';
      const hint =
        err.message === 'Load failed' || err.name === 'TypeError'
          ? `Cannot reach the API at ${base}. Start the backend (cd backend && npm start) and restart the frontend after changing .env.`
          : err.message || 'Failed to load catalog';
      setError(hint);
      setLeagues([]);
      setAllJerseys([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const value = useMemo(() => {
    const totalClubs = leagues.reduce((sum, league) => sum + (league.clubs?.length || 0), 0);

    const findClub = (clubName) => {
      for (const league of leagues) {
        const club = league.clubs?.find((c) => c.club === clubName);
        if (club) return { ...club, league };
      }
      return null;
    };

    const jerseysForClub = (clubName) => allJerseys.filter((jersey) => jersey.club === clubName);

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
      loading,
      error,
      refetch: loadCatalog,
    };
  }, [leagues, allJerseys, loading, error, loadCatalog]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return ctx;
};
