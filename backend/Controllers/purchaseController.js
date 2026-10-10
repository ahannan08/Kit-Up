import { User } from '../Schemas/userSchema.js';
import { Purchase } from '../Schemas/purchaseSchema.js';
import { Cart } from '../Schemas/cartSchema.js';
import { expectedPriceForType, lineTotalForItem } from '../config/pricing.js';

const purchase = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Invalid cart items' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const normalizedItems = [];
  let totalPrice = 0;
  for (const item of cartItems) {
    const unitPrice = expectedPriceForType(item.type);
    if (unitPrice == null) {
      return res.status(400).json({ message: 'Each item must have type Home or Away' });
    }
    const lineTotal = lineTotalForItem(item);
    if (lineTotal == null) {
      return res.status(400).json({ message: 'Invalid cart line item' });
    }
    totalPrice += lineTotal;
    normalizedItems.push({
      jerseyId: item.jerseyId,
      quantity: item.quantity,
      price: unitPrice,
      image: item.image,
      type: item.type,
      rating: item.rating,
    });
  }

  if (user.balance < totalPrice) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  user.balance -= totalPrice;
  await user.save();

  const newPurchase = await Purchase.create({
    userId,
    items: normalizedItems,
    totalPrice,
  });

  await Cart.deleteMany({ userId });

  res.status(200).json({
    message: 'Purchase successful',
    purchase: newPurchase,
    balance: user.balance,
  });
};

export { purchase };
