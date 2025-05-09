import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to User
  products: Array<{
    product: mongoose.Schema.Types.ObjectId; // Reference to Product
    quantity: number;
  }>;
}

const cartSchema: Schema<ICart> = new Schema(
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
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
