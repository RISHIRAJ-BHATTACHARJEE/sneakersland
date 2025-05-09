import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};
