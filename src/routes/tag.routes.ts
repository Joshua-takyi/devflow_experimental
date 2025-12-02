import { Router } from "express";
import { TagController } from "../controller/tags.controller";
import { protectionMiddleware } from "../middleware/protect";
import { RoleBaseMiddleware } from "../middleware/role.middleware";
import { csrfMiddleware } from "../middleware/csrf.middleware";

const tagRoute = Router();
tagRoute.use(protectionMiddleware);
tagRoute.use(RoleBaseMiddleware);
tagRoute.use(csrfMiddleware);
tagRoute.post("/", TagController.createTag);

export default tagRoute;
