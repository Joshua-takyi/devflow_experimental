// logic file , checks for duplicates,hashing etc doesn't call the db

import { UserRepository } from "../repository/user.respository";
import { LoginDTO, RegisterDTO } from "../types/auth.types";
import { UserProfile } from "../types/user.types";
import { ComparePassword, HashPassword } from "../utils/security";

export const userService = {
  async register(user: RegisterDTO) {
    const existingUser = await UserRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await HashPassword(user.password);
    const newUser = await UserRepository.create({
      email: user.email,
      password: hashedPassword,
    });
    return newUser;
  },

  async login(user: LoginDTO) {
    const existingUser = await UserRepository.findByEmail(user.email);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const isPasswordValid = await ComparePassword(
      user.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return existingUser;
  },

  async delete(user: Pick<UserProfile, "id">) {
    return UserRepository.delete(user);
  },
};
