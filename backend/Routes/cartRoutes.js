import express from 'express';
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeFromCart,
} from '../Controllers/cartController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const cartRouter = express.Router();

cartRouter.post('/cart/add', asyncHandler(addToCart));
cartRouter.get('/cart/:userId', asyncHandler(getCartItems));
cartRouter.patch('/cart/:itemId', asyncHandler(updateCartItem));
cartRouter.delete('/remove/:itemId', asyncHandler(removeFromCart));

export default cartRouter;
