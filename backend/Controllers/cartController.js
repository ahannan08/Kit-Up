import { User } from '../Schemas/userSchema.js';
import { Cart } from '../Schemas/cartSchema.js';

const addToCart = async (req, res) => {
  const { userId, jerseyId, quantity, image, type, rating, price } = req.body;

  if (!userId || jerseyId == null || !quantity) {
    return res.status(400).json({ message: 'userId, jerseyId, and quantity are required' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const parsedJerseyId = parseInt(jerseyId, 10);
  const existingItem = await Cart.findOne({ userId, jerseyId: parsedJerseyId });

  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
  } else {
    await Cart.create({
      userId,
      jerseyId: parsedJerseyId,
      quantity,
      image,
      type,
      rating,
      price,
    });
  }

  res.status(201).json({ message: 'Item added to cart successfully' });
};

const getCartItems = async (req, res) => {
  const { userId } = req.params;
  const [cartItems, user] = await Promise.all([
    Cart.find({ userId }),
    User.findById(userId),
  ]);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ cartItems, userBalance: user.balance });
};

const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (quantity == null || quantity < 1) {
    return res.status(400).json({ message: 'quantity must be at least 1' });
  }

  const cartItem = await Cart.findByIdAndUpdate(itemId, { quantity }, { new: true });
  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  res.status(200).json({ message: 'Cart updated', cartItem });
};

const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  const deleted = await Cart.findByIdAndDelete(itemId);
  if (!deleted) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  res.status(200).json({ message: 'Item removed from cart successfully' });
};

export { addToCart, getCartItems, updateCartItem, removeFromCart };
