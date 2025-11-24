import jwt from "jsonwebtoken";
import { UserProps } from "../types/user.types";
import { JWT_SECRET } from "../config/env";
import crypto from "crypto";
export function generateToken(
  user: Pick<UserProps, "id" | "email" | "firstName" | "lastName">
) {
  return jwt.sign({ id: user.id }, JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string) as Pick<
    UserProps,
    "id" | "email" | "firstName" | "lastName"
  >;
}

export const generateCsrf = () => crypto.randomBytes(64).toString("hex");
