import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api/v1/health", (req, res) => {
  res.status(200).json("api is healthy");
});

app.use("/api/v1/users", userRoute);

// Error middleware MUST be last
app.use(errorMiddleware);

export default app;
