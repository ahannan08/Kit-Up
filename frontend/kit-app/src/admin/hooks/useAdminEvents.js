import { useEffect, useState } from 'react';
import { getEvents, ensureEventsSeeded } from '../store/eventsStore.js';
import { EVENTS_UPDATED_EVENT } from '../store/constants.js';

export const useAdminEvents = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    ensureEventsSeeded();
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener(EVENTS_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(EVENTS_UPDATED_EVENT, refresh);
  }, []);
  return getEvents();
};
