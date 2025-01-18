import { createLogger, format, transports } from "winston";

const logger = createLogger({
 level: "info",
 format: format.combine(
  format.colorize(),
  format.timestamp({
   format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.json(),
  format.splat(),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message }) => {
   return `${timestamp} ${level}: ${message}`;
  })
 ),
 transports: [new transports.Console()],
});

export default logger;

