import { prisma } from "../lib/prisma";
import { ProjectDTO } from "../types/project.types";

export const ProjectsRepository = {
  create(project: ProjectDTO) {
    return prisma.project.create({
      data: {
        title: project.title,
        summary: project.summary,
        difficulty: project.difficulty,
        coverImage: project.coverImage,
        content: project.content,
        requirements: project.requirements,
        user: {
          connect: {
            id: project.userId,
          },
        },
        tags: {
          connectOrCreate: project.tagName.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
        projectSteps: {
          create: project.projectSteps.map((step, index) => ({
            title: step.title,
            content: step.content,
            order: index + 1,
            images: step.images,
          })),
        },
      },
    });
  },

  getProjects(limit: number, page: number) {
    return prisma.project.findMany({
      where: {
        isPublic: true,
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        projectSteps: {
          select: {
            id: true,
            title: true,
            content: true,
            order: true,
            images: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  },

  update(project: ProjectDTO) {
    return prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        title: project.title,
        summary: project.summary,
        difficulty: project.difficulty,
        coverImage: project.coverImage,
        content: project.content,
        requirements: project.requirements,
        tags: {
          connectOrCreate: project.tagName.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
        projectSteps: {
          deleteMany: {},
          create: project.projectSteps.map((step, index) => ({
            title: step.title,
            content: step.content,
            order: index + 1,
            images: step.images,
          })),
        },
      },
    });
  },

  delete(id: string) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  },

  getProjectById(id: string) {
    return prisma.project.findUnique({
      where: {
        id,
        isPublic: true,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
        projectSteps: {
          select: {
            id: true,
            title: true,
            content: true,
            order: true,
            images: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  },
};
