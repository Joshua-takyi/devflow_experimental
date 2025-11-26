import { prisma } from "../lib/prisma";
import { TagInput } from "../schema/tags.schema";

export const TagRepository = {
  createTag: async (tag: TagInput) => {
    return await prisma.tag.create({ data: tag });
  },
};
