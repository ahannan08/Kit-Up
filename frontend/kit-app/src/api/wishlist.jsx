export const wishlistService = {
  getWishlist: () =>
    httpClient(API_ROUTES.WISHLIST.GET),

  addItem: (productId, variant) =>
    httpClient(API_ROUTES.WISHLIST.ADD, {
      method: 'POST',
      body: JSON.stringify({ productId, variant }),
    }),

  removeItem: (id) =>
    httpClient(API_ROUTES.WISHLIST.REMOVE(id), {
      method: 'DELETE',
    }),
};