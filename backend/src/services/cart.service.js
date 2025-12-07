import Cart from "../models/Cart.model.js";

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) cart = await Cart.create({ userId, items: [] });
  return cart;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const cart = await getCart(userId);

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  return cart;
};

export const removeFromCart = async (userId, productId) => {
  const cart = await getCart(userId);
  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();
  return cart;
};

export const updateQuantity = async (userId, productId, quantity) => {
  const cart = await getCart(userId);
  const item = cart.items.find(i => i.productId.toString() === productId);
  if (!item) throw new Error("Item not in cart");

  item.quantity = quantity;
  await cart.save();
  return cart;
};

export const clearCart = async (userId) => {
  const cart = await getCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
};
