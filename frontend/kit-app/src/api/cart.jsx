export const cartService = {
  getCart: () =>
    httpClient(API_ROUTES.CART.GET),

  addItem: (productId, variant, size, qty) =>
    httpClient(API_ROUTES.CART.ADD, {
      method: 'POST',
      body: JSON.stringify({ productId, variant, size, qty }),
    }),

  updateItem: (itemId, qty) =>
    httpClient(API_ROUTES.CART.UPDATE(itemId), {
      method: 'PUT',
      body: JSON.stringify({ qty }),
    }),

  removeItem: (itemId) =>
    httpClient(API_ROUTES.CART.REMOVE(itemId), {
      method: 'DELETE',
    }),
};