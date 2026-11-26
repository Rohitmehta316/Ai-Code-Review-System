import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import {
  analyzeReview,
  deleteReview,
  getReview,
  listReviews,
  reviewStats,
} from "../controllers/reviewController.js";
import { env } from "../config/env.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateBody } from "../middleware/validate.js";
const r = Router();
const body = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  language: z.enum(["javascript", "typescript", "python", "java"]),
  sourceCode: z.string().min(1).max(env.MAX_CODE_LENGTH),
});
const limit = rateLimit({
  windowMs: env.AI_RATE_LIMIT_WINDOW_MS,
  limit: env.AI_RATE_LIMIT_MAX,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Review limit reached. Wait before analyzing more code.",
  },
});
r.use(authenticate);
r.post("/analyze", limit, validateBody(body), analyzeReview);
r.get("/stats", reviewStats);
r.get("/", listReviews);
r.get("/:id", getReview);
r.delete("/:id", deleteReview);
export default r;
