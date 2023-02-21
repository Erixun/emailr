import * as dotenv from "dotenv";
dotenv.config();
import Express, { json } from "express";
import "./services/passport.js";
import { connect } from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
import routes from "./routes/index.js";
const app = Express();

const cookieKey = process.env.COOKIE_KEY;
if (typeof cookieKey === undefined) throw Error("KEY UNAVAILABLE");
app
  .use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [cookieKey as string],
    })
  )
  .use(passport.initialize())
  .use(passport.session());

const MONGO_URI = process.env.MONGO_URI ?? "";
connect(MONGO_URI, () => {
  console.log("Successfully connected to MongoDB database");
});

app.use(json());
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
