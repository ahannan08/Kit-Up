// api/routes.jsx

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ROUTES = {
  // Auth APIs
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },

  // User APIs
  USER: {
    ME: `${API_BASE_URL}/user/me`,
  },

  // Product APIs
  PRODUCTS: {
    LIST: `${API_BASE_URL}/products`,
    CREATE: `${API_BASE_URL}/products`,
    GET_SINGLE: (id) => `${API_BASE_URL}/products/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id) => `${API_BASE_URL}/products/${id}`,
  },

  // Cart APIs
  CART: {
    ADD: `${API_BASE_URL}/cart`,
    GET: `${API_BASE_URL}/cart`,
    UPDATE: (itemId) => `${API_BASE_URL}/cart/${itemId}`,
    REMOVE: (itemId) => `${API_BASE_URL}/cart/${itemId}`,
  },

  // Wishlist APIs
  WISHLIST: {
    ADD: `${API_BASE_URL}/wishlist`,
    GET: `${API_BASE_URL}/wishlist`,
    REMOVE: (id) => `${API_BASE_URL}/wishlist/${id}`,
  },

  // Order APIs
  ORDERS: {
    CREATE: `${API_BASE_URL}/orders`,
    LIST: `${API_BASE_URL}/orders`,
    GET_SINGLE: (id) => `${API_BASE_URL}/orders/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
  },
};