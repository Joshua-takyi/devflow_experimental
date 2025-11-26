import { prisma } from "../lib/prisma";
import { generateRefreshToken } from "../utils/jwt";

const EXPIRATION_DATE_FOR_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;

export const RefreshTokenRepository = {
  findById(userId: string) {
    return prisma.refreshToken.findUnique({
      where: { userId },
    });
  },

  createOrRenew(userId: string) {
    return prisma.refreshToken.upsert({
      where: { userId },
      create: {
        userId,
        token: generateRefreshToken(),
        expiredAt: new Date(Date.now() + EXPIRATION_DATE_FOR_REFRESH_TOKEN),
      },
      update: {
        expiredAt: new Date(Date.now() + EXPIRATION_DATE_FOR_REFRESH_TOKEN),
      },
    });
  },
};
