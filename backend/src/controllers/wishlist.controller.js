import * as wishlistService from "../services/wishlist.service.js";

export const getUserWishlist = async (req, res) => {
  const wl = await wishlistService.getWishlist(req.user.id);
  res.json(wl);
};

export const toggleItem = async (req, res) => {
  const { productId } = req.body;
  const wl = await wishlistService.toggleWishlist(req.user.id, productId);
  res.json(wl);
};
