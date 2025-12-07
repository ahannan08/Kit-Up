
export const userService = {
  getProfile: () =>
    httpClient(API_ROUTES.USER.ME),
};