import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface RequestWithUser extends Request {
  user: any;
}

export const authenticateToken: (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res
      .status(401)
      .json({ success: false, message: "You must be authenticated" });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ success: false, message: "Invalid token" });
      return;
    }
    req.user = user;
    next();
  });
};
