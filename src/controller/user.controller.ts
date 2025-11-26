import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/error";
import { userService } from "../service/user.service";
import {
  registerSchema,
  userProfileSchema,
  updatePasswordSchema,
} from "../schema/user.schema";
import {
  generateCsrf,
  generateRefreshToken,
  generateToken,
} from "../utils/jwt";
import { RefreshTokenRepository } from "../repository/refreshToken.repository";
// gets the data from the services and uses it to call the database

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = registerSchema.parse(req.body);
      const { email, password } = validateSchema;
      if (!email || !password) {
        return next(new AppError("Invalid email or password", 400));
      }
      const user = await userService.register({ email, password });

      const token = generateToken(user);
      res.cookie("access_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });

      const csrf = generateCsrf();
      res.cookie("csrf_token", csrf, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });

      const refreshToken = await RefreshTokenRepository.createOrRenew(user.id);

      res.cookie("refresh_token", refreshToken.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new AppError("Invalid email or password", 400));
      }
      const user = await userService.login({ email, password });

      const token = generateToken(user);
      res.cookie("access_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });

      const csrf = generateCsrf();
      res.cookie("csrf_token", csrf, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });

      const refreshToken = await RefreshTokenRepository.createOrRenew(user.id);
      res.cookie("refresh_token", refreshToken.token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        return next(new AppError("Unauthorized", 401));
      }
      const validateSchema = userProfileSchema.parse(req.body);
      const { firstName, lastName, phone, bio } = validateSchema;
      if (!firstName || !lastName || !phone) {
        return next(new AppError("Invalid user profile", 400));
      }
      const updatedUser = await userService.update({
        id: user.id,
        firstName,
        lastName,
        phone,
        bio: bio ?? null,
      });
      if (!updatedUser) {
        return next(new AppError("User not found", 404));
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        return next(new AppError("unauthenticated user", 401));
      }
      const validateSchema = updatePasswordSchema.parse(req.body);
      const { password } = validateSchema;
      if (!password) {
        return next(new AppError("Invalid password", 400));
      }
      const updatedUser = await userService.updatePassword({
        email: user.email,
        password,
      });
      if (!updatedUser) {
        return next(new AppError("User not found", 404));
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
};
