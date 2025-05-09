import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import morgan from "morgan";
import userRouter from "./routes/user.route";

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

// Routes
app.use("/api", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
