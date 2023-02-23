import { Request, Response, NextFunction } from "express";

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "Unauthorized. You are not logged in." });
  }

  next(); //if user authorized, move on to next middleware
};

export default requireLogin;
