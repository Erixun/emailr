import { Schema, model } from "mongoose";

const userSchema = new Schema({
  googleId: String,
});

const User = model("users", userSchema);

export default User;
