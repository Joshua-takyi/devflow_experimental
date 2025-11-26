import { Request, Response, NextFunction } from "express";
import { tagSchema } from "../schema/tags.schema";
import { TagRepository } from "../repository/tags.repository";

export const TagController = {
  createTag: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = tagSchema.parse(req.body);
      const { name } = validatedData;
      const tag = await TagRepository.createTag({ name });
      return res.status(201).json({ success: true, data: tag });
    } catch (error) {
      next(error);
    }
  },
};
