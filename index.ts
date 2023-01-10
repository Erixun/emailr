import Express, { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
dotenv.config();

const app = Express();

// app.get('/', (req: Request, res: Response) => {
//   res.send({message: "Welcome to the index"})
// })

// passport.use(new GoogleStrategy()); //generic register of strategies

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
