import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

export const createOrderFromCart = async (userId, address) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Build order items
  const orderItems = cart.items.map(i => ({
    product: i.product._id,
    quantity: i.quantity,
    priceAtOrder: i.product.price
  }));

  const totalAmount = orderItems.reduce((acc, i) => acc + i.priceAtOrder * i.quantity, 0);

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    address
  });

  // clear cart
  cart.items = [];
  await cart.save();

  return order;
};

export const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderDetails = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId })
    .populate("items.product");

  if (!order) throw new Error("Order not found");

  return order;
};
