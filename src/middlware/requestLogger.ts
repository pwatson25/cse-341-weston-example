import { Request, Response, NextFunction } from "express";

import logger from "../lib/logger";

const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // Note that this may be a different header if we
  // route traffic through a load  balancer
  const ip = req.headers["x-forwarded-for"] || req.ip;

  logger().info(` ==> Started request to ${req.url}`);
  logger().info(`Query parameters: ${JSON.stringify(req.query)}`);
  logger().info(`Body: ${JSON.stringify(req.body)}`);

  next();
};

export default requestLogger;
