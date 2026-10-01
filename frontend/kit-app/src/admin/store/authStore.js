import { ADMIN_PASSWORD, STORAGE_KEYS } from './constants.js';

export const loginAdmin = (password) => {
  if (password !== ADMIN_PASSWORD) return false;
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ at: Date.now() }));
  return true;
};

export const logoutAdmin = () => {
  localStorage.removeItem(STORAGE_KEYS.session);
};

export const isAdminAuthenticated = () => !!localStorage.getItem(STORAGE_KEYS.session);
