import { getCatalog } from '../store/catalogStore.js';

export const getCheckoutUser = () => ({
  userId: localStorage.getItem('userId') || 'anonymous',
  userEmail: localStorage.getItem('userEmail') || 'unknown@example.com',
  userName: localStorage.getItem('userName') || 'Customer',
});

export const snapshotCart = (cartItems = []) => {
  const jerseys = getCatalog().jerseys;
  return cartItems.map((item) => {
    const kit = jerseys.find((j) => j._id === String(item.jerseyId));
    return {
      type: item.type,
      price: item.price,
      quantity: item.quantity,
      jerseyId: item.jerseyId,
      clubName: item.clubName || kit?.clubName || '',
    };
  });
};
