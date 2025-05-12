import { loginSchema, userSchema } from "../utils/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth";
import { json } from "stream/consumers";

//Create a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Step 1. Validate req body
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      // Return validation errors with proper response structure
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    // Step 2. Get User Details from client
    const { name, email, password, address, phone } = req.body;

    // Step 3. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
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

    // Handle any possible errors during save
    try {
      await newUser.save();
    } catch (saveError: any) {
      console.error("Error saving user:", saveError);
      res.status(500).json({ message: "Error saving user to database" });
      return;
    }

    //Step 6. Generating JWT using the user ID & Sending the token back to the client
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    //Step 7. Set JWT as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Step 8. Return safe user data (excluding password)
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

//Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Step 1: Validate input
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = result.data;

    // Step 2: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Step 4: Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // Step 5: Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Step 6: Return user data without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Logout User
export const logoutUser = async (req:Request, res:Response): Promise<void> => {
  try {
    //Step 1: Check if the token cookie exists
    const token = req.cookies?.token;

    //Step 2: If n token is found, user is likely already logged out
    if(!token){
      res.status(200).json({message: "Already Logged Out"});
      return;
    }

    //Step 3: Clear the token cookie
    res.clearCookie("token",{
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })

    //Step 4: Respond with sucess message
    res.status(200).json({message: "Logout successful."})
  } catch (error) {
    //Step 5: Handle unexpected errors
    console.error("Logout Error: ", error)
    res.status(500).json({message: "Logout failed. Try Again"});
  }
}

//Current User
export const currentUser = async (req:AuthRequest, res:Response): Promise<void> => {
    try {
      //Step 1: Ensure user is authenticated and user ID is available
      const userId = req.user?.id;

      //Step 2: If no user ID, respond with an error
      if(!userId){
        res.status(401).json({message: "Not Authorized"})
        return;
      }

      //Step 3: FInd the user in the database, (exclude password)
      const user = await User.findById(userId).select("-password")

      //Step 4: If user not found, return 404
      if(!user){
        res.status(404).json({message: "User not found"})
        return;
      }

      //Step 5: Return the user profile
      res.status(200).json({user})
    } catch (error) {
      console.error("Error in getMe: ", error);
      res.status(500).json({message: "Server error"})
    }
}