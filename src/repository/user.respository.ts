import { prisma } from "../lib/prisma.ts";
import { RegisterDTO } from "../types/auth.types.ts";
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

  update(user: Pick<UserProfile, "id">) {
    return prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  },

  delete(user: Pick<UserProfile, "id">) {
    return prisma.user.delete({
      where: { id: user.id },
    });
  },
};
