import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Cart } from '../Schemas/cartSchema.js';


//Register
const Register = ( async (req, res) => {
try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword , balance: 1500 });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});

//////////////////////////


const Login = (async (req, res) => {
try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'b', { expiresIn: '1h' });
    

    // Set the token as a cookie or in the response header

    res.status(200).json({ message: 'Login successful', user: { userId: user._id ,name: user.name, email: user.email ,token  } });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});
//////////////////////////



   
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

//////////////////////////


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


//////////////////////////



  /*const updateCartItemQuantity = async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const { quantity } = req.body;
  
      // Update the quantity of the cart item
      await Cart.findByIdAndUpdate(itemId, { quantity });
  
      res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
 */ 
  
//////////////////////////

// Inside the purchase controller function
const purchase = async (req, res) => {
  try {
    
    const { userId, itemId , jerseyId, quantity, image,type,rating,price} = req.body;
    

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the item by itemId
    const item = await Cart.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Deduct the item's price from the user's balance
    const totalPrice = price * quantity;
    console.log('User balance before purchase:', user.balance);
    console.log('backend Item price:', totalPrice);
    user.balance -= totalPrice;
    console.log('User balance after purchase:', user.balance);
    await user.save();

    // Optionally, mark the item as purchased in the database
    item.purchased = true;
    await item.save();

    const purchase = new Purchase({
      userId,
      jerseyId,   
      quantity,
      image,
      type,
      rating,
      price,
      totalPrice
    });
    console.log("purchase backend:",purchase)
    await purchase.save();
    


    res.status(200).json({ message: 'Item purchased successfully' });
  } catch (error) {
    console.error('Error purchasing item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  

  const getOrders = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Retrieve all orders for the user
      const orders = await Purchase.find({ userId });
      console.log('Orders retrieved:', orders);
  
     
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export {Login, Register, addToCart, getCartItems, removeFromCart,  purchase, getOrders}




