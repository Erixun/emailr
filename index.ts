import * as dotenv from "dotenv";
dotenv.config();
import Express from "express";
import authRoutes from "./routes/authRoutes.js";
import user from "./models/User.js";
import "./services/passport.js";
import { connect } from "mongoose";
const app = Express();

const MONGO_URI = process.env.MONGO_URI ?? "";
console.log(MONGO_URI);
connect(MONGO_URI, () => {
  console.log("Successfully connected to MongoDB database");
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
