import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import crypto from "crypto";

type UserProps = {
  id: string;
  email: string;
};

export function generateToken(user: UserProps) {
  return jwt.sign({ id: user.id }, JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string) as UserProps;
}

export const generateCsrf = () => crypto.randomBytes(64).toString("hex");

export const generateRefreshToken = () => {
  return crypto.randomBytes(20).toString("hex");
};
