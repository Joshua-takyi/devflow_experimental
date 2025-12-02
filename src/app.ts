import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes";
import tagRoute from "./routes/tag.routes";
import projectRoute from "./routes/project.routes";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api/v1/health", (req, res) => {
  res.status(200).json("api is healthy");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tags", tagRoute);
app.use("/api/v1/projects", projectRoute);
// Error middleware MUST be last
app.use(errorMiddleware);

export default app;
