import { useEffect, useState } from 'react';
import { getCatalog } from '../store/catalogStore.js';
import { CATALOG_UPDATED_EVENT } from '../store/constants.js';

export const useAdminCatalog = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener(CATALOG_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, refresh);
  }, []);
  return getCatalog();
};
