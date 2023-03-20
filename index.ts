import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import Express, { json } from "express";
import "./services/passport.js";
import { connect } from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(Express.static("../client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  //TODO: fix this route to serve the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
