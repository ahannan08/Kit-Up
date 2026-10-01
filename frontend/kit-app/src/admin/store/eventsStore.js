import { STORAGE_KEYS, EVENTS_UPDATED_EVENT, newId } from './constants.js';
import { buildSeedEvents } from './seedEvents.js';

const readRaw = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.events);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const normalizeEvents = (events) => ({
  purchases: events.purchases || [],
  attempts: events.attempts || [],
  cartEvents: events.cartEvents || [],
  productViews: events.productViews || [],
});

const writeRaw = (events) => {
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(normalizeEvents(events)));
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));
};

export const ensureEventsSeeded = () => {
  if (localStorage.getItem(STORAGE_KEYS.eventsSeeded)) {
    const existing = readRaw();
    return existing ? normalizeEvents(existing) : normalizeEvents(buildSeedEvents());
  }
  const seed = buildSeedEvents();
  writeRaw(seed);
  localStorage.setItem(STORAGE_KEYS.eventsSeeded, '1');
  return normalizeEvents(seed);
};

export const getEvents = () => {
  const raw = readRaw();
  if (raw) return normalizeEvents(raw);
  return ensureEventsSeeded();
};

export const getPurchases = () => getEvents().purchases;

export const getAttempts = () => getEvents().attempts;

export const recordPurchase = ({ userId, userEmail, userName, items, totalPrice }) => {
  const events = getEvents();
  events.purchases.unshift({
    id: newId(),
    userId: userId || 'anonymous',
    userEmail: userEmail || 'unknown@example.com',
    userName: userName || 'Customer',
    items,
    totalPrice,
    completedAt: new Date().toISOString(),
  });
  writeRaw(events);
};

export const recordCheckoutAttempt = ({
  userId,
  userEmail,
  stage,
  cartSnapshot,
  totalAmount,
  errorMessage,
}) => {
  const events = getEvents();
  events.attempts.unshift({
    id: newId(),
    userId: userId || 'anonymous',
    userEmail: userEmail || 'unknown@example.com',
    stage,
    cartSnapshot: cartSnapshot || [],
    totalAmount: totalAmount || 0,
    errorMessage: errorMessage || '',
    createdAt: new Date().toISOString(),
  });
  writeRaw(events);
};

export const recordAddToCart = ({
  userId,
  userEmail,
  jerseyId,
  clubName,
  type,
  price,
  quantity,
}) => {
  const events = getEvents();
  events.cartEvents.unshift({
    id: newId(),
    userId: userId || 'anonymous',
    userEmail: userEmail || 'unknown@example.com',
    jerseyId: String(jerseyId),
    clubName: clubName || '',
    type: type || '',
    price: price || 0,
    quantity: quantity || 1,
    createdAt: new Date().toISOString(),
  });
  writeRaw(events);
};

export const recordProductView = ({ jerseyId, clubName, type, price }) => {
  const events = getEvents();
  events.productViews.unshift({
    id: newId(),
    jerseyId: String(jerseyId),
    clubName: clubName || '',
    type: type || '',
    price: price || 0,
    createdAt: new Date().toISOString(),
  });
  writeRaw(events);
};
