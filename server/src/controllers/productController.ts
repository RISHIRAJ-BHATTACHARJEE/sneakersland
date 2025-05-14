import { Request, Response } from "express";
import { getAllProductsSchema, productSchema } from "../utils/schema";
import Product from "../models/Product";
import mongoose from "mongoose";
import { AuthRequest } from "../middlewares/auth";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // ✅ Check for multipart/form-data
    if (!req.is("multipart/form-data")) {
      res.status(415).json({
        message: "Unsupported Media Type. Expected multipart/form-data.",
      });
      return;
    }

    const { name, description, price, category, stock } = req.body;

    const parsedPrice = Number(price);
    const parsedStock = stock !== undefined ? Number(stock) : undefined;

    if (
      isNaN(parsedPrice) ||
      (parsedStock !== undefined && isNaN(parsedStock))
    ) {
      res
        .status(400)
        .json({ message: "Price and stock must be valid numbers" });
      return;
    }

    // ✅ Step 2: Now validate using Zod
    const parseResult = productSchema.safeParse({
      name,
      description,
      price: parsedPrice,
      category,
      stock: parsedStock,
    });

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((err) => err.message);
      res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
      return;
    }

    // Handle image
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Product image is required" });
      return;
    }

    const imageUrl = `/uploads/${file.filename}`;

    // Create Product
    const newProduct = await Product.create({
      ...parseResult.data,
      imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
    return;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creating product:", err.message);
    } else {
      console.error("Unknown error in createProduct:", err);
    }

    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

// Get All Products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // ✅ Step 1: Validate query params
    const parseResult = getAllProductsSchema.safeParse(req.query);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => e.message);
      res.status(400).json({ message: "Invalid query params", errors });
      return;
    }

    const { page = "1", limit = "10", category, search } = parseResult.data;

    const currentPage = Math.max(1, parseInt(page));
    const pageSize = Math.max(1, parseInt(limit));

    const filter: Record<string, any> = {};
    if (category) filter.category = category;
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive name search
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      total,
      page: currentPage,
      limit: pageSize,
      products,
    });
    return;
  } catch (err: any) {
    console.error("Error in getAllProducts:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

// Get Single Product by ID
export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Get the product ID from the request parameters

    // Validate the ID format (using mongoose's ObjectId validation)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product ID format" });
      return;
    }

    // Fetch the product from the database using the ID
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Return the product data as a response
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    // More specific error logging and handling
    if (error instanceof mongoose.Error) {
      // Mongoose specific error (e.g. database connection issue)
      console.error("Database error:", error.message);
      res.status(500).json({ message: "Database connection issue" });
    } else if (error instanceof Error) {
      // General error
      console.error("Error fetching product:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      // Catch-all for unknown errors
      console.error("Unknown error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

// Update Product
export const updateProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Extract the product ID from the URL parameters
    const { name, description, price, category, stock } = req.body; // Extract the updated product data from the request body

    // Validate if the product ID exists
    const product = await Product.findById(id);
    console.log(product)
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Check if the logged-in user is authorized to update this product
    // Only admin can update products
    if (req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "You do not have permission to update this product" });
        return;
    }

    // Update product fields (you can add additional validation here if necessary)
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // Save the updated product to the database
    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Product
export const deleteProduct = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
    
        // Validate the product ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
          res.status(400).json({ message: "Invalid product ID format" });
          return;
        }
    
        // Check if the product exists
        const product = await Product.findById(id);
    
        if (!product) {
          res.status(404).json({ message: "Product not found" });
          return;
        }
    
        // Optional: Log which admin deleted the product (if needed for auditing)
        console.log(`Product "${product.name}" deleted by admin ID: ${req.user?.id}`);
    
        // Delete the product
        await product.deleteOne();
    
        res.status(200).json({ message: "Product deleted successfully", productId: id });
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};
