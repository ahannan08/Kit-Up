export const productService = {
  getAll: () =>
    httpClient(API_ROUTES.PRODUCTS.LIST),

  getById: (id) =>
    httpClient(API_ROUTES.PRODUCTS.GET_SINGLE(id)),

  create: (productData) =>
    httpClient(API_ROUTES.PRODUCTS.CREATE, {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  update: (id, productData) =>
    httpClient(API_ROUTES.PRODUCTS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  delete: (id) =>
    httpClient(API_ROUTES.PRODUCTS.DELETE(id), {
      method: 'DELETE',
    }),
};