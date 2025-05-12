import { Router } from "express";
import  { deleteUser, getUsers, getUserById, updateUser} from "../controllers/userController";
import { authenticateUser } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/authorize";

const userRouter = Router();

userRouter.get("/all-users", authenticateUser, authorizeRoles("admin"),getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", authenticateUser, updateUser);
userRouter.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteUser);

export default userRouter;




// | Method | Route               | Description                           | Access |
// | ------ | ------------------- | ------------------------------------- | ------ |
// | GET    | `/api/users/`       | Get all users (admin)                 | Admin  |
// | GET    | `/api/users/:id`    | Get single user (admin)               | Admin  |
// | PUT    | `/api/users/update` | Update user info (name, address, etc) | User   |
// | DELETE | `/api/users/:id`    | Delete user (admin)                   | Admin  |
