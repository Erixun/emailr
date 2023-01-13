import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "../config/keys.js";

const passportConfig = passport.use(
  new GoogleStrategy( //I am known as a strategy called 'google'
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //code received at /auth/google/callback
      console.log(accessToken); //"Hey, this user said we're allowed to read their profile"
      //we may take this identifying info and save it to DB
      console.log("refresh token", refreshToken); //allows us to refresh the access token post expiration
      console.log("profile", profile);
    }
  )
); //generic register of strategies

export default passportConfig;
