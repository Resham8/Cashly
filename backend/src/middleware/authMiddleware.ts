import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authentication;

  if (!authHeader || !(authHeader as string).startsWith("Bearer ")) {
    res.status(403).json({ message: "Invalid token or user" });
    return;
  }

  const token = (authHeader as string)?.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    
    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      res.status(403).json({ message: "Invalid token or user" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid token or user" });
  }
}
