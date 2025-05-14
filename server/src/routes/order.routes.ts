import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/authorize";
import { getAllOrders, getMyOrders, getOrderById, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orderController";

const orderRouter = Router();

//User Routes
orderRouter.post("/", authenticateUser, placeOrder);
orderRouter.get("/", authenticateUser, getMyOrders);
orderRouter.get("/:id", authenticateUser, getOrderById);

//Admin Routes
orderRouter.get("/all", authenticateUser, authorizeRoles("admin"), getAllOrders);
orderRouter.get("/user/:id", authenticateUser, authorizeRoles("admin"), getUserOrders);
orderRouter.put("/:id", authenticateUser, authorizeRoles("admin"), updateOrderStatus);


export default orderRouter;

// | Method | Route             | Description                     | Access     |
// | ------ | ----------------- | ------------------------------- | ---------- |
// | POST   | `/api/orders`     | Place an order from cart        | User       |
// | GET    | `/api/orders`     | Get current user's orders       | User       |
// | GET    | `/api/orders/all` | Get all orders (admin)          | Admin      |
// | PUT    | `/api/orders/:id` | Update order status (admin)     | Admin      |
// | GET    | `/api/orders/:id` | Get specific order (admin/user) | Admin/User |
