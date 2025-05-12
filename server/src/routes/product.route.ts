import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/authorize";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController";
import upload from "../utils/upload";

const productRouter = Router();

//Public Routes
productRouter.get("/bulk", getAllProducts);
productRouter.get("/:id", getProduct);

//Admin Routes
productRouter.post("/create", authenticateUser, authorizeRoles("admin"), upload.single("image"), createProduct);
productRouter.put("/update/:id", authenticateUser, authorizeRoles("admin"), updateProduct);
productRouter.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteProduct);


export default productRouter;


// | Method | Route               | Description                     | Access |
// | ------ | ------------------- | ------------------------------- | ------ |
// | POST   | `/api/products`     | Create new product              | Admin  |
// | GET    | `/api/products/bulk`| Get all products (with filters) | Public |
// | GET    | `/api/products/:id` | Get single product details      | Public |
// | PUT    | `/api/products/:id` | Update product                  | Admin  |
// | DELETE | `/api/products/:id` | Delete product                  | Admin  |
