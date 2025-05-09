import { Router } from "express";
import  { createUser, deleteUser, getUsers, getUserById, updateUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;