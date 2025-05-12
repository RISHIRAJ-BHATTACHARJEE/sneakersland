import { Router } from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/authController";
import { authenticateUser } from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authenticateUser, currentUser);

export default authRouter;


// | Method | Route                | Description                 |
// | ------ | -------------------- | --------------------------- |
// | POST   | `/api/auth/register` | Register new user           |
// | POST   | `/api/auth/login`    | Login user and return token |
// | POST   | `/api/auth/logout`   | Logout user (clear cookie)  |
// | GET    | `/api/auth/me`       | Get logged-in user profile  |
