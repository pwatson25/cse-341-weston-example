import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import swaggerUi from "swagger-ui-express";

import requestLogger from "../../middlware/requestLogger";
import eventRoutes from "./event.routes";
import cleanRomanceBooksRoutes from "./cleanRomance.routes";
import fantasyBooksRoutes from "./fairytale.routes";
import logger from "../../lib/logger";

import swaggerDoc from "../../swagger-output.json";

const router = Router();

interface StatusMap {
  [key: string]: number;
}

// API docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Login, logout, etc. with Auth0
router.use(requestLogger);

// Events
router.use("/api/v1/events", eventRoutes(express.Router()));

// Clean Romance Books
router.use(cleanRomanceBooksRoutes);

// Fairytales and Fantasy Books
router.use(fantasyBooksRoutes);

// Custom 404 handler
// See https://expressjs.com/en/starter/faq.html
router.use((_req: Request, res: Response): void => {
  res.status(404).json({ error: "not found" });
});

// See http://expressjs.com/en/guide/error-handling.html
router.use(
  (error: Error, req: Request, res: Response, _next: NextFunction): void => {
    const statusMap: StatusMap = {
      ValidationError: 400,
    };

    res.status(statusMap[error.name] || 500);

    res.json({
      error: error.message || "Application error, please contact support.",
    });
  }
);

export default router;
