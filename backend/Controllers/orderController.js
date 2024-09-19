
import {User} from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';


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
  
  export {getOrders}