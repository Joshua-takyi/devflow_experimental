import app from "./app";
import { PORT } from "../src/config/env.ts";
function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`server running on:${PORT}`);
    });

    server.on("error", () => {
      console.log("failed to connect to the server");
    });
  } catch (error) {}
}

startServer();
