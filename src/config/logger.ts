import winston from "winston";
const { combine, timestamp, json, errors, colorize } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    errors({
      stack: true,
    }), // print the stack trace for errors
    timestamp(), //add timestamp to the log
    json() // convert the log to json
  ),

  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    })
  );
}
