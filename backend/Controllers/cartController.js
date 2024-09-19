
import {User} from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Cart } from '../Schemas/cartSchema.js';



   
const addToCart = async (req, res) => {
  try {
    const { userId, jerseyId, quantity, image, type, rating, price } = req.body;

    // Fetch user balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user already has the jersey in the cart
    const existingItem = await Cart.findOne({ userId, jerseyId: parseInt(jerseyId) });

    if (existingItem) {
      // If the jersey already exists in the cart, update the quantity
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      // If the jersey doesn't exist in the cart, create a new cart item
      const cartItem = new Cart({ userId, jerseyId: parseInt(jerseyId), quantity, image, type, rating, price });
      await cartItem.save();
    }

    console.log("form backend, items are added successfully...");
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId });
    const user = await User.findById(userId);
    const userBalance = user ? user.balance : null;
    console.log(userBalance)
    //console.log(cartItems)

    res.status(200).json({ cartItems, userBalance });  

  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//////////////////////////


  
  const removeFromCart = async (req, res) => {
    try {
      const itemId = req.params.itemId;
      await Cart.findByIdAndDelete(itemId);
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };







 

export { addToCart, getCartItems, removeFromCart}




