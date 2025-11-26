import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { csrfMiddleware } from "../middleware/csrf.middleware";
import { protectionMiddleware } from "../middleware/protect";
const projectRoute = Router();
// PUBLIC ROUTES
projectRoute.get("/:id", ProjectController.getProjectById);

// PROTECTED ROUTES
projectRoute.use(csrfMiddleware);
projectRoute.use(protectionMiddleware);
projectRoute.post("/", ProjectController.createProject);
projectRoute.get("/", ProjectController.getProjects);
// TODO
// projectRoute.patch("/:id/steps/reorder", ProjectController.reorderProjectSteps);
// projectRoute.post("/:id/comments", ProjectController.addComment);
// projectRoute.post("/:id/likes", ProjectController.likeProject);
// projectRoute.post("/:id/saved", ProjectController.saveProject);
// projectRoute.delete("/:id", ProjectController.deleteProject);
// projectRoute.patch("/:id", ProjectController.updateProject);
export default projectRoute;
