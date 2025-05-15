import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Cart from "../models/Cart";
import Order from "../models/Order";
import mongoose from "mongoose";

export const placeOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      res.status(400).json({ message: "Your cart is empty" });
      return;
    }

    const products = cart.products.map((item) => ({
      product: new mongoose.Types.ObjectId((item.product as any)._id),
      quantity: item.quantity,
    }));

    const totalAmount = cart.products.reduce(
      (acc, item) => acc + item.quantity * (item.product as any).price,
      0
    );

    const newOrder = await Order.create({
      user: userId,
      products,
      totalAmount,
      shippingAddress,
    });

    cart.products = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user?.id })
      .populate("products.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "admin";

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("products.product", "name price imageUrl");

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const orderUserId =
      typeof order.user === "object" &&
      order.user !== null &&
      "_id" in order.user
        ? (order.user as any)._id.toString()
        : order.user.toString();

    if (!isAdmin && orderUserId !== userId) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
