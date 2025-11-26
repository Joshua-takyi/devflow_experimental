import { Request, NextFunction, Response } from "express";
import { AppError } from "../config/error";
export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) return next();
    const csrfFromHeader = req.headers["x-csrf-token"] as string;
    const csrfTokenFromCookies = req.cookies.csrf_token;
    if (
      !csrfFromHeader ||
      !csrfTokenFromCookies ||
      csrfFromHeader !== csrfTokenFromCookies
    ) {
      return next(new AppError("CSRF token mismatch", 401));
    }
    next();
  } catch (error) {
    next(error);
  }
};
