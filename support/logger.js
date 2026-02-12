const winston = require("winston");
const fs = require("fs");

if (!fs.existsSync("reports")) {
  fs.mkdirSync("reports", { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'reports/test.log', options: { flags: 'w' } })
  ]
});

module.exports = logger;
