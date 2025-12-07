import Wishlist from "../models/Wishlist.model.js";

export const getWishlist = async (userId) => {
  let wl = await Wishlist.findOne({ userId }).populate("items");
  if (!wl) wl = await Wishlist.create({ userId, items: [] });
  return wl;
};

export const toggleWishlist = async (userId, productId) => {
  const wl = await getWishlist(userId);

  if (wl.items.includes(productId)) {
    wl.items = wl.items.filter(id => id.toString() !== productId);
  } else {
    wl.items.push(productId);
  }

  await wl.save();
  return wl;
};
