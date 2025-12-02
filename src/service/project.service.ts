import { ProjectsRepository } from "../repository/projects.repository";
import { ProjectDTO } from "../types/project.types";

export const ProjectService = {
  async createProject(project: ProjectDTO) {
    return ProjectsRepository.create(project);
  },

  async getProjects(limit: number, page: number) {
    return ProjectsRepository.getProjects(limit, page);
  },

  async getProjectById(id: string) {
    return ProjectsRepository.getProjectById(id);
  },

  async deleteProject(id: string) {
    return ProjectsRepository.delete(id);
  },

  async updateProject(project: ProjectDTO) {
    return ProjectsRepository.update(project);
  },
};
