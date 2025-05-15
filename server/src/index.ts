import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";
import cartRouter from "./routes/cart.route";
import orderRouter from "./routes/order.routes";
// import paymentRouter from "./routes/payment.routes";

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
