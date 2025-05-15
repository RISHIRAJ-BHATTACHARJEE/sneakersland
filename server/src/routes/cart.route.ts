import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import {
  addToCart,
  clearCart,
  deleteCartItems,
  getCartItems,
  updateCartItems,
} from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/", authenticateUser, addToCart);
cartRouter.get("/", authenticateUser, getCartItems);
cartRouter.put("/update", authenticateUser, updateCartItems);
cartRouter.delete("/delete/:id", authenticateUser, deleteCartItems);
cartRouter.delete("/clear", authenticateUser, clearCart);

export default cartRouter;

// | Method | Route               | Description                 | Access |
// | ------ | ------------------- | --------------------------- | ------ |
// | POST   | `/api/cart`         | Add item to cart            | User   |
// | GET    | `/api/cart`         | Get user cart & total price | User   |
// | PUT    | `/api/cart/:itemId` | Update quantity in cart     | User   |
// | DELETE | `/api/cart/:itemId` | Remove item from cart       | User   |
// | DELETE | `/api/cart/clear`   | Clear entire cart           | User   |
