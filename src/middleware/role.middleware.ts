import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/error";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export const RoleBaseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(new AppError("Authentication failed: Token not found.", 401));
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return next(
        new AppError("Authentication failed: Invalid or expired token.", 401)
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      return next(new AppError("user not found", 404));
    }
    if (user.role !== "ADMIN") {
      return next(new AppError("forbidden", 403));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
