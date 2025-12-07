import * as cartService from "../services/cart.service.js";

export const getUserCart = async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.json(cart);
};

export const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user.id, productId, quantity);
  res.json(cart);
};

export const removeItem = async (req, res) => {
  const { productId } = req.body;
  const cart = await cartService.removeFromCart(req.user.id, productId);
  res.json(cart);
};

export const updateItemQty = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.updateQuantity(req.user.id, productId, quantity);
  res.json(cart);
};

export const clearUserCart = async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);
  res.json(cart);
};
