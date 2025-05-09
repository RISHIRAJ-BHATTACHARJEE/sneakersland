import mongoose, { Document, Schema } from "mongoose";

enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  role: UserRole;
  isActive: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
