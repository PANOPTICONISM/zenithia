import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserToken {
  [key: string]: string;
}

export const userToken: UserToken = {};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY as string);
    Object.assign(userToken, decoded);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token, auth denied." });
  }
};
