import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to User
  product: mongoose.Schema.Types.ObjectId; // Reference to Product
  rating: number; // 1 to 5 stars
  comment: string;
}

const reviewSchema: Schema<IReview> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
