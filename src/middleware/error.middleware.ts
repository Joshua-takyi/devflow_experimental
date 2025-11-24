// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { logger } from "../config/logger";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    return handlePrismaError(err, res);
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.name === "validatorError") {
    const msg = Object.values((err as any).errors)
      .map((error: any) => error.message)
      .join(", ");
    return res.status(400).json({
      status: "error",
      message: msg,
    });
  }
  // Handle unknown errors
  logger.error(err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

// Helper to handle Prisma-specific errors
const handlePrismaError = (
  err: PrismaClientKnownRequestError,
  res: Response
) => {
  switch (err.code) {
    case "P2002":
      // Unique constraint violation
      return res.status(409).json({
        status: "error",
        message: "A record with this value already exists",
      });
    case "P2025":
      // Record not found
      return res.status(404).json({
        status: "error",
        message: "Record not found",
      });
    case "P2026":
      return res.status(400).json({
        status: "error",
        message:
          "The current database provider doesn't support a feature that the query used: {feature}",
      });
    case "P2027":
      return res.status(400).json({
        status: "error",
        message:
          "Multiple errors occurred on the database during query execution: {errors}",
      });
    case "P2028":
      return res.status(400).json({
        status: "error",
        message: `Transaction API error: ${err.message}`,
      });
    case "P2029":
      return res.status(400).json({
        status: "error",
        message: `Query parameter limit exceeded error: ${err.message}`,
      });
    case "P2030":
      return res.status(400).json({
        status: "error",
        message: `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema`,
      });
    // Migration errors
    case "P3000":
      return res.status(500).json({
        status: "error",
        message: `Failed to create database: ${err.message}`,
      });
    case "P3001":
      return res.status(400).json({
        status: "error",
        message: `Migration possible with destructive changes and possible data loss: ${err.message}`,
      });
    case "P3002":
      return res.status(500).json({
        status: "error",
        message: `The attempted migration was rolled back: ${err.message}`,
      });
    case "P3003":
      return res.status(400).json({
        status: "error",
        message:
          "The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate",
      });
    case "P3004":
      return res.status(400).json({
        status: "error",
        message:
          "The database is a system database, it should not be altered with prisma migrate. Please connect to another database.",
      });
    case "P3005":
      return res.status(400).json({
        status: "error",
        message:
          "The database schema is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline",
      });
    case "P3006":
      return res.status(500).json({
        status: "error",
        message: `Migration failed to apply cleanly to the shadow database: ${err.message}`,
      });
    case "P3007":
      return res.status(400).json({
        status: "error",
        message: `Some of the requested preview features are not yet allowed in schema engine. Please remove them from your data model before using migrations: ${err.message}`,
      });
    case "P3008":
      return res.status(409).json({
        status: "error",
        message: `The migration is already recorded as applied in the database: ${err.message}`,
      });
    case "P3009":
      return res.status(500).json({
        status: "error",
        message:
          "migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve",
      });
    case "P3010":
      return res.status(400).json({
        status: "error",
        message:
          "The name of the migration is too long. It must not be longer than 200 characters (bytes).",
      });
    case "P3011":
      return res.status(400).json({
        status: "error",
        message: `Migration cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? ${err.message}`,
      });
    case "P3012":
      return res.status(400).json({
        status: "error",
        message: `Migration cannot be rolled back because it is not in a failed state: ${err.message}`,
      });
    default:
      return res.status(400).json({
        status: "error",
        message: "Database operation failed",
      });
  }
};
