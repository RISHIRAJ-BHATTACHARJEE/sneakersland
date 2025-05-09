import { Request, Response } from "express";
import User from "../models/User";
import { userSchema } from "../utils/schema";
import bcrypt from "bcrypt";

//Get all users interface
interface GetUsersQuery {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }

//Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
      // Step 1. Validate req body
      const result = userSchema.safeParse(req.body);
  
      if (!result.success) {
        // Return validation errors with proper response structure
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        });
      }
  
      // Step 2. Get User Details from client
      const { name, email, password, address, phone } = req.body;
  
      // Step 3. Check if user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      // Step 4. Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Step 5. Create and save the new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        address,
        phone,
      });
  
      // Use try/catch block to handle any possible errors during save
      try {
        await newUser.save();
      } catch (saveError: any) {
        console.error("Error saving user:", saveError);
        return res.status(500).json({ message: "Error saving user to database" });
      }
  
      // Step 6. Return safe user data (excluding password)
      const { password: _, ...userWithoutPassword } = newUser.toObject();
  
      // Return the newly created user, without sensitive information
      res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error: unknown) {
      // Error handling with type-safe error response
      console.error("Error in createUser:", error);
  
      if (error instanceof Error) {
        res.status(500).json({ message: error.message || "Server error" });
      } else {
        res.status(500).json({ message: "Unexpected server error" });
      }
    }
  };

//Get all users
export const getUsers = async (req: Request<{}, {}, {}, GetUsersQuery>, res: Response): Promise<void> => {
    //Get All Users Example Query:- GET /api/users?page=2&limit=15&sortBy=name&sortOrder=asc
    try {
      //Step 1. Get query parameters with type-safety and default values
      const { page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = req.query;
  
      //Step 2. Sanitize query parameters with better validation
      const pageNum = Math.max(Number(page), 1); // Ensure page number is at least 1
      const limitNum = Math.min(Number(limit), 100); // Max limit of 100 for pagination
      const sortField = ["createdAt", "name", "email"].includes(sortBy) ? sortBy : "createdAt"; // Prevent invalid sort field
      const sortDirection = sortOrder === "asc" ? 1 : -1; // Default to descending order
  
      //Step 3. Calculate skip value for pagination
      const skip = (pageNum - 1) * limitNum;
  
      //Step 4. Query the database with pagination, sorting, and selected fields
      const users = await User.find()
        .skip(skip)
        .limit(limitNum)
        .sort({ [sortField]: sortDirection })
        .select("-password"); // Exclude password field for security
  
      //Step 5. Get the total number of users to calculate pagination info
      const totalUsers = await User.countDocuments();
  
      //Step 6. Calculate total pages and whether there is a next or previous page
      const totalPages = Math.ceil(totalUsers / limitNum);
      const hasNextPage = pageNum < totalPages;
      const hasPrevPage = pageNum > 1;
  
      //Step 7. Send the response
      res.status(200).json({
        data: users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalUsers,
          hasNextPage,
          hasPrevPage,
        },
      });
    } catch (error: unknown) {
      // Error handling with more specific types
      console.error("Error in getUsers:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred." });
      }
    }
  };

//Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<any> => {
    try {
      // Step 1. Validate the user ID in the request parameter
      const userId = req.params.id;
  
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      // Step 2. Find the user by ID
      const user = await User.findById(userId).select("-password"); // Exclude password for security
  
      // Step 3. Handle case where user is not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Step 4. Return the user data without password field
      res.status(200).json(user);
    } catch (error: unknown) {
      // Step 5. Error handling
      console.error("Error in getUserById:", error);
  
      // If error is a known instance of Error, provide a detailed message
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message || "Server error" });
      }
  
      // Fallback for unexpected errors
      res.status(500).json({ message: "Unexpected server error" });
    }
  };

//Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {}
};

//Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {}
};