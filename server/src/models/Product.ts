import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  ratings: number;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
