import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { responseUnauthorized } from "../libs/response";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return responseUnauthorized(res);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY as string);
    req.user = verified;

    next();
  } catch (error) {
    return responseUnauthorized(res);
  }
};
