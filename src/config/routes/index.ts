import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";

import requestLogger from "../../middlware/requestLogger";
import docsRoutes from "./docs.routes";
import cleanRomanceBooksRoutes from "./cleanRomance.routes";
import fantasyBooksRoutes from "./fairytale.routes";

const router = Router();

interface StatusMap {
  [key: string]: number;
}

router.use(requestLogger);

// Docs
router.use(docsRoutes);

// Clean Romance Books
router.use(cleanRomanceBooksRoutes);

// Fairytales and Fantasy Books
router.use(fantasyBooksRoutes);

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
