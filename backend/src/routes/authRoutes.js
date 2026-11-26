import { Router } from "express";
import { z } from "zod";
import { currentUser, login, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateBody } from "../middleware/validate.js";
import { currentPassword, newPassword } from "../services/passwordSchema.js";
const r = Router();
const signup = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: newPassword,
});
const signin = z.object({
  email: z.string().trim().email().max(254),
  password: currentPassword,
});
r.post("/register", validateBody(signup), register);
r.post("/login", validateBody(signin), login);
r.get("/me", authenticate, currentUser);
export default r;
