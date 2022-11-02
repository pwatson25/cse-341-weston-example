import { Router } from "express";

import jsonResponse from "../../middlware/jsonResponse";
import { bookName, create, reviewStars } from "../../controllers/cleanRomance.controller";

const router = Router();

router.use(jsonResponse);

router.get("/api/v1/cleanRomances", reviewStars);
router.get("/api/v1/cleanRomances", bookName);
router.post("/api/v1/cleanRomances", create);

export default router;
