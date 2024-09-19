
import {User} from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Cart } from '../Schemas/cartSchema.js';

const purchase = async (req, res) => {
    try {
      const { userId, cartItems } = req.body;
      console.log("req body is from controller", req.body)
  
      // Validate that cartItems is an array
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'Invalid cart items' });
      }
  
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Calculate total price from the cart items
      const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
      // Check if user has enough balance
      if (user.balance < totalPrice) {
        console.log("user balance,",user.balance)
        console.log("price balance,",totalPrice)
  
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      // Deduct the total price from user's balance
      user.balance -= totalPrice;
      await user.save();  // Update user balance in the database
  
  
      cartItems.forEach(item => {
        console.log("Cart Item:", item); // Log each item in the cart
        console.log("Item details - Jersey ID:", item.jerseyId);
        console.log("Item details - Quantity:", item.quantity);
        console.log("Item details - Price:", item.price);
        console.log("Item details - Image:", item.image);
        console.log("Item details - Type:", item.type);
        console.log("Item details - Rating:", item.rating);
      });
  
      // Create a new purchase entry in the database
      const newPurchase = new Purchase({
        userId,
        items: cartItems.map(item => ({
          jerseyId: item.jerseyId, // Should be defined
          quantity: item.quantity,   // Should be defined
          price: item.price,         // Should be defined
          image: item.image,         // Should be defined
          type: item.type,           // Should be defined
          rating: item.rating         // Should be defined
        })),
        totalPrice
      });
  console.log("new purchase is ", newPurchase)
      await newPurchase.save();
  
      // Return success response
      res.status(200).json({ message: 'Purchase successful', purchase: newPurchase });
    } catch (error) {
      console.error('Error purchasing item:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export {purchase}