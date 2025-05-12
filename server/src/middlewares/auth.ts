// ==========================================================
// This middleware authenticates users by verifying JWT tokens 
// from HTTP-only cookies or Authorization headers. 
// It attaches the authenticated user's ID and role to the request 
// object for use in protected routes.
// ==========================================================


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Step 1: Load environment variables from .env file
dotenv.config();

// Step 2: Extend the Express Request type to include a 'user' field
export interface AuthRequest extends Request {
  user?: { id: string; role: string }; // This will store the authenticated user's ID
}

// Step 3: Create the middleware function to authenticate user
export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Step 4: Try to extract token from HTTP-only cookie (preferred for security)
  let token = req.cookies?.token;

  // Step 5: If not found in cookies, check Authorization header (as fallback)
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Step 6: If no token found in either cookie or header, deny access
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    // Step 7: Verify and decode the token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    // Step 8: Attach user ID to the request object for downstream use
    req.user = { id: decoded.userId, role: decoded.role };

    // Step 9: Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Step 10: If token is invalid or expired, respond with 401 Unauthorized
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
