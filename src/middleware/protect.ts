// middleware file for protecting of routes
import { Request, NextFunction, Response } from "express";
import { AppError } from "../config/error";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../utils/jwt";
export const protectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new AppError("unauthorized access", 401));
  }

  //   verify token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return next(new AppError("invalid or expired token", 401));
  }
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.id },
  });
  if (!user) {
    return next(new AppError("unauthorized access", 401));
  }

  req.user = {
    id: user.id,
    email: user.email,
  };

  next();
};
