import express from 'express';
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from '../Controllers/cartController.js';


const cartRouter = express.Router();

// Cart routes
cartRouter.post('/cart/add', addToCart);
cartRouter.get('/cart/:userId', getCartItems);
cartRouter.delete('/remove/:itemId', removeFromCart);


export default cartRouter;
