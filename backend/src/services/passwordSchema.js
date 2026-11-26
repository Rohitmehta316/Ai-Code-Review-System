import { z } from "zod";
const bcryptLimit = (value) => Buffer.byteLength(value, "utf8") <= 72;
export const newPassword = z
  .string()
  .min(10)
  .max(128)
  .refine(bcryptLimit, "Password must fit bcrypt’s 72-byte limit.");
export const currentPassword = z
  .string()
  .min(1)
  .max(128)
  .refine(bcryptLimit, "Password must fit bcrypt’s 72-byte limit.");
