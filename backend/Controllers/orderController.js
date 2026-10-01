import { User } from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';

const getOrders = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const orders = await Purchase.find({ userId }).sort({ purchaseDate: -1 });
  res.status(200).json({ orders });
};

export { getOrders };
