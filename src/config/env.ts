import { config } from "dotenv";

const environment = process.env.NODE_ENV || "development";

if (environment === "production") {
  config({ path: ".env.production" });
} else {
  config({ path: ".env.local" });
}

export const { DATABASE_URL, PORT, JWT_SECRET } = process.env;
