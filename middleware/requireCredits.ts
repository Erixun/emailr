import { NextFunction, Request, Response } from "express";

const requireCredits = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.credits < 1)
    return res.status(401).send({ error: "Not enough credits" });

  next();
};

export default requireCredits;
