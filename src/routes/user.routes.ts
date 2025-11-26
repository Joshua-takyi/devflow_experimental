import { Router } from "express";
import { userController } from "../controller/user.controller";
import { csrfMiddleware } from "../middleware/csrf.middleware";
import { protectionMiddleware } from "../middleware/protect";

const userRoute = Router();
// PUBLIC ROUTES
userRoute.post("/", userController.register);
userRoute.post("/login", userController.login);

userRoute.use(csrfMiddleware);
userRoute.use(protectionMiddleware);
// PROTECTED ROUTES
userRoute.get("/me", (req, res) => {
  return res.status(200).json(req.user);
});
userRoute.patch("/profile", userController.update);
userRoute.patch("/password", userController.updatePassword);
export default userRoute;
