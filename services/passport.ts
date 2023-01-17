import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
dotenv.config();
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config/keys.js";

import mongoose from "mongoose";
//model Class, use Pascal case
import User from "../models/User.js";

// const User = mongoose.model("users");
// import keys from "../config/keys.js";
// import { env } from "process";
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
// console.log(process.env);
const passportConfig = passport.use(
  new GoogleStrategy( //I am known as a strategy called 'google'
    {
      clientID: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //code received at /auth/google/callback
      console.log(accessToken); //"Hey, this user said we're allowed to read their profile"
      //we may take this identifying info and save it to DB
      console.log("refresh token", refreshToken); //allows us to refresh the access token post expiration
      console.log("profile", profile);

      const user = new User({ googleId: profile.id });
      user.save();
    }
  )
); //generic register of strategies

export default passportConfig;
