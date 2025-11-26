import { prisma } from "../lib/prisma.ts";
import { LoginDTO, RegisterDTO } from "../types/auth.types.ts";
import { UserProfile } from "../types/user.types.ts";

// database logic only
export const UserRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  create(user: RegisterDTO) {
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  },

  update(user: UserProfile) {
    return prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        bio: user.bio,
        password: user.password,
      },
    });
  },

  delete(user: Pick<UserProfile, "id">) {
    return prisma.user.delete({
      where: { id: user.id },
    });
  },

  updatePassword(user: LoginDTO) {
    return prisma.user.update({
      where: { email: user.email },
      data: {
        password: user.password,
      },
    });
  },
};
