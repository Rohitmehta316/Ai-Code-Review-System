import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export function authenticate(req, res, next) {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ message: "Sign in to continue." });
  try {
    const data = jwt.verify(token, env.JWT_SECRET);
    if (!data.sub)
      return res
        .status(401)
        .json({ message: "Your session is invalid or expired." });
    req.userId = data.sub;
    return next();
  } catch {
    return res
      .status(401)
      .json({ message: "Your session is invalid or expired." });
  }
}
