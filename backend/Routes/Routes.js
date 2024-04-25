import { Login , Register,addToCart, getCartItems, getOrders, purchase, removeFromCart } from "../Controllers/Controller.js";

import express from "express"



const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);


// routes/cart.js


// Routes for adding, getting, and removing items from the cart
router.post("/cart/add", addToCart);
router.get("/cart/:userId", getCartItems);
router.delete("/remove/:itemId", removeFromCart);
//router.put("/cart/update/:itemId", updateCartItemQuantity); // New route for updating quantity
router.put('/cart/purchase', purchase)
router.get('/cart/myorders/:userId', getOrders)



export default router; 


