import { createOrderFromCart, getMyOrders, getOrderDetails } from "../services/order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await createOrderFromCart(req.user.id, req.body.address);
    res.status(201).json({ ok: true, order });
  } catch (err) {
    next(err);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await getMyOrders(req.user.id);
    res.json({ ok: true, orders });
  } catch (err) {
    next(err);
  }
};

export const orderDetails = async (req, res, next) => {
  try {
    const order = await getOrderDetails(req.params.id, req.user.id);
    res.json({ ok: true, order });
  } catch (err) {
    next(err);
  }
};
