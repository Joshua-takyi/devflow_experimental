import { RefreshTokenRepository } from "../repository/refreshToken.repository";

export const refreshTokenService = {
  async createOrRenew(userId: string) {
    return RefreshTokenRepository.createOrRenew(userId);
  },

  async createRefreshToken(userId: string) {
    const token = await RefreshTokenRepository.findById(userId);
    if (!token) {
      return refreshTokenService.createOrRenew(userId);
    }
    if (token.expiredAt.getTime() < Date.now()) {
      return refreshTokenService.createOrRenew(userId);
    }
    return token;
  },
};
