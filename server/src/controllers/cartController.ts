import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import mongoose, { mongo } from "mongoose";
import Product from "../models/Product";
import Cart from "../models/Cart";
import { updateCartSchema } from "../utils/schema";
import { Schema } from "mongoose";

// export const addToCart = async (
//   req: AuthRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const userId = req.user?.id;
//     const { productId, quantity } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(productId) || quantity <= 0) {
//       res.status(400).json({ message: "Invalid product ID or quantity." });
//       return;
//     }

//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       res.status(404).json({ message: "Product not found." });
//       return;
//     }

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       cart = new Cart({
//         user: userId,
//         products: [{ product: productId, quantity }],
//       });
//     } else {
//       const index = cart.products.findIndex(
//         (item) => item.product.toString() === productId
//       );
//       if (index > -1) {
//         cart.products[index].quantity += quantity;
//       } else {
//         cart.products.push({ product: productId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item added to cart", cart });
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const addToCart = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Items must be a non-empty array." });
      return;
    }

    for (const item of items) {
      const { productId, quantity } = item;

      if (
        !mongoose.Types.ObjectId.isValid(productId) ||
        typeof quantity !== "number" ||
        quantity <= 0
      ) {
        res
          .status(400)
          .json({
            message: `Invalid product ID or quantity for productId: ${productId}`,
          });
        return;
      }

      const productExists = await Product.findById(productId);
      if (!productExists) {
        res.status(404).json({ message: `Product not found: ${productId}` });
        return;
      }
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    for (const item of items) {
      const { productId, quantity } = item;
      const index = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Items added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    // Get cart for the user and populate each product in the array
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: Product,
      select: "name price imageUrl stock category description",
    });

    if (!cart || cart.products.length === 0) {
      res.status(200).json({
        message: "Your cart is empty",
        cart: [],
      });
      return;
    }

    const formattedCart = cart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart items fetched successfully",
      cart: formattedCart,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCartItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    // Validate request body using Zod
    const parsed = updateCartSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      res.status(400).json({ message: "Invalid input", errors });
      return;
    }

    const { items } = parsed.data;

    // Check all product IDs are valid and exist
    for (const item of items) {
      const productExists = await Product.exists({ _id: item.productId });
      if (!productExists) {
        res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
        return;
      }
    }

    // Get or create the cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Create a map for faster lookups
    const cartProductMap = new Map<string, number>();
    cart.products.forEach((item) => {
      cartProductMap.set(item.product.toString(), item.quantity);
    });

    // Update cart items
    for (const item of items) {
      if (item.quantity <= 0) {
        // Remove product from cart if quantity is 0
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== item.productId
        );
      } else {
        const objectId = item.productId as unknown as Schema.Types.ObjectId;

        const existingIndex = cart.products.findIndex(
          (p) => p.product.toString() === objectId.toString()
        );

        if (existingIndex >= 0) {
          cart.products[existingIndex].quantity = item.quantity;
        } else {
          cart.products.push({
            product: objectId, // ✅ now it's a valid ObjectId
            quantity: item.quantity,
          });
        }
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error updating cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCartItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const productId = req.params.id;

    //Check if productId is a valid ObjectID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.products.length === initialLength) {
      res.status(404).json({ essage: "Product not found in cart" });
      return;
    }

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: cart.products,
    });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearCart = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.products.length === 0) {
      res.status(200).json({ message: "Cart is already empty" });
      return;
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
