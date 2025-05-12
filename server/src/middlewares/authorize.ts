import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user as { role?: string };

    if (!user || !allowedRoles.includes(user.role || "")) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
};
