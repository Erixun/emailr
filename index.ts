import Express, { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
dotenv.config();
import keys from "./config/keys.js";

console.log(keys.GOOGLE_CLIENT_ID);
const app = Express();

// app.get('/', (req: Request, res: Response) => {
//   res.send({message: "Welcome to the index"})
// })
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy( //I am known as a strategy called 'google'
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
); //generic register of strategies

app.get(
  //ERROR: 400: redirect_uri_mismatch ?
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], //what access we want to have, from a (key)list of scopes
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
