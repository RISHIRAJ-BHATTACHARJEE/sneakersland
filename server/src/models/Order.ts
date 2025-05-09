import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to User
  products: Array<{
    product: mongoose.Schema.Types.ObjectId; // Reference to Product
    quantity: number;
  }>;
  totalAmount: number;
  orderDate: Date;
  shippingAddress: string;
  status: string; // e.g., 'pending', 'shipped', 'delivered'
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
