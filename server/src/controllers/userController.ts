import { Request, Response } from "express";
import User from "../models/User";
import { userUpdateSchema } from "../utils/schema";
import mongoose from "mongoose";
import { AuthRequest } from "../middlewares/auth";

//Get all users interface
interface GetUsersQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

//Get all users
export const getUsers = async (
  req: Request<{}, {}, {}, GetUsersQuery>,
  res: Response
): Promise<void> => {
  //Get All Users Example Query:- GET /api/users?page=2&limit=15&sortBy=name&sortOrder=asc
  try {
    //Step 1. Get query parameters with type-safety and default values
    const {
      page = "1",
      limit = "10",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    //Step 2. Sanitize query parameters with better validation
    const pageNum = Math.max(Number(page), 1); // Ensure page number is at least 1
    const limitNum = Math.min(Number(limit), 100); // Max limit of 100 for pagination
    const sortField = ["createdAt", "name", "email"].includes(sortBy)
      ? sortBy
      : "createdAt"; // Prevent invalid sort field
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
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Step 1. Validate the user ID in the request parameter
    const userId = req.params.id;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    // Step 2. Find the user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password for security

    // Step 3. Handle case where user is not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Step 4. Return the user data without password field
    res.status(200).json(user);
  } catch (error: unknown) {
    // Step 5. Error handling
    console.error("Error in getUserById:", error);

    // If error is a known instance of Error, provide a detailed message
    if (error instanceof Error) {
      res.status(500).json({ message: error.message || "Server error" });
      return;
    }

    // Fallback for unexpected errors
    res.status(500).json({ message: "Unexpected server error" });
  }
};

//Update User
export const updateUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Step 1. Validate User ID
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid User ID" });
      return;
    }

    // Step 2. Ensure the logged-in user is updating only their own profile
    if (req.user?.id !== id) {
      res
        .status(403)
        .json({ message: "Forbidden: Cannot update another user's profile" });
      return;
    }

    //Step 3. Validate and sanitize the request body
    const result = userUpdateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Validation Failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    // Step 4. Prevent sensitive fields from being updated
    const disallowedFields = ["password", "_id", "__v"];
    for (const key of disallowedFields) {
      if (key in req.body) delete req.body[key];
    }

    //Step 5. Perform the updation
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      projection: "-password",
    });

    //Step 6. Handle not found
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    //Step 7. Send the response
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//Delete User
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
