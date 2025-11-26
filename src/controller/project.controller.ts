import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../service/project.service";
import { ProjectInput, projectSchema } from "../schema/project.schema";
import { AppError } from "../config/error";
import { paginatedResponse } from "../utils/paginatedResponse";

export const ProjectController = {
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        return next(new AppError("unauthenticated user", 401));
      }
      const validatedData = projectSchema.parse(req.body);
      const {
        title,
        summary,
        difficulty,
        content,
        requirements,
        coverImage,
        projectSteps,
        tagName,
      } = validatedData;
      const project = await ProjectService.createProject({
        title,
        summary,
        difficulty,
        content,
        requirements,
        coverImage,
        projectSteps,
        tagName,
        userId: user.id,
        metaData: {
          likes: 0,
          views: 0,
          projectId: user.id,
        },
      });
      return res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit, page } = req.query;
      // convert limit and page into a number
      let parsedLimit = parseInt(limit as string);
      let parsedPage = parseInt(page as string);

      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        parsedLimit = 10;
      }

      if (isNaN(parsedPage) || parsedPage <= 0) {
        parsedPage = 1;
      }

      const data = await ProjectService.getProjects(parsedLimit, parsedPage);
      if (data.length === 0) {
        return res
          .status(200)
          .json({ message: "empty response", success: true, data: [] });
      }

      return res.status(200).json({
        message: "success",
        success: true,
        data: paginatedResponse(data, parsedPage, parsedLimit),
      });
    } catch (error) {
      next(error);
    }
  },

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await ProjectService.getProjectById(id);
      if (!project) {
        return next(new AppError("project not found", 404));
      }
      return res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  },

  // async updateProject(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const validatedData = projectSchema.parse(req.body);
  //     const project = await ProjectService.updateProject(
  //       {
  //         id:validatedData
  //       }
  //     );
  //     if (!project) {
  //       return next(new AppError("project not found", 404));
  //     }
  //     return res.status(200).json(project);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
