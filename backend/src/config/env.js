import "dotenv/config";
import { z } from "zod";
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/ai-code-review"),
  JWT_SECRET: z
    .string()
    .min(32)
    .default("local-only-replace-this-secret-before-launch"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-3.5-flash-lite"),
  MAX_CODE_LENGTH: z.coerce.number().int().min(1000).max(100000).default(30000),
  AI_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  AI_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
});
export const env = envSchema.parse(process.env);
if (
  env.NODE_ENV === "production" &&
  (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)
)
  throw new Error(
    "Set a strong JWT_SECRET of at least 32 characters in production.",
  );
