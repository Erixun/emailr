import Express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import "./services/passport.js";
const app = Express();

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
