export const orderService = {
  getOrders: () =>
    httpClient(API_ROUTES.ORDERS.LIST),

  getOrderById: (id) =>
    httpClient(API_ROUTES.ORDERS.GET_SINGLE(id)),

  createOrder: (orderData) =>
    httpClient(API_ROUTES.ORDERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  updateOrderStatus: (id, status) =>
    httpClient(API_ROUTES.ORDERS.UPDATE_STATUS(id), {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};