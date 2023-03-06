import mongoose, { Schema, model } from "mongoose";

declare global {
  namespace Express {
    interface User extends mongoose.Document {
      id?: mongoose.Types.ObjectId;
      googleId: string;
      credits: any;
    }
  }
}

export interface IUser {
  googleId: string;
  credits: { type: Number; default: 0 };
}

const userSchema = new Schema<IUser>({
  googleId: String,
  credits: { type: Number, default: 0 },
});

const User = model("users", userSchema);

export default User;
