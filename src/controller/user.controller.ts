import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/error";
import { userService } from "../service/user.service";
import { userSchema } from "../schema/user.schema";
// gets the data from the services and uses it to call the database

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validateSchema = userSchema.parse(req.body);
      const { email, password } = validateSchema;
      if (!email || !password) {
        return next(new AppError("Invalid email or password", 400));
      }
      const user = await userService.register({ email, password });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
};
