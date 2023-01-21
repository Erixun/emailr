import mongoose, { Schema, model } from "mongoose";

declare global {
  namespace Express {
    interface User {
      id?: mongoose.Types.ObjectId;
      googleId: string;
    }
  }
}

export interface IUser {
  googleId: string;
}

const userSchema = new Schema<IUser>({
  googleId: String,
});

const User = model("users", userSchema);

export default User;
