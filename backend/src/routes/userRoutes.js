import { Router } from "express";
import { z } from "zod";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateBody } from "../middleware/validate.js";
import { currentPassword, newPassword } from "../services/passwordSchema.js";
const r = Router();
const update = z
  .object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().max(254).optional(),
    currentPassword: currentPassword.optional(),
    newPassword: newPassword.optional(),
  })
  .refine(
    (v) => Object.keys(v).length > 0,
    "Provide at least one profile field.",
  )
  .refine(
    (v) => Boolean(v.currentPassword) === Boolean(v.newPassword),
    "Both passwords are required to change password.",
  );
r.use(authenticate);
r.get("/profile", getProfile);
r.put("/profile", validateBody(update), updateProfile);
export default r;
