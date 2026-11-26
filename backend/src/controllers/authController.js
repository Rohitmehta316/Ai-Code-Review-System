import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
});
const tokenFor = (id) =>
  jwt.sign({}, env.JWT_SECRET, { subject: id, expiresIn: env.JWT_EXPIRES_IN });
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
    });
    return res
      .status(201)
      .json({ token: tokenFor(user.id), user: publicUser(user) });
  } catch (e) {
    return next(e);
  }
}
export async function login(req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).select("+password");
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });
    return res.json({ token: tokenFor(user.id), user: publicUser(user) });
  } catch (e) {
    return next(e);
  }
}
export async function currentUser(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "Account not found." });
    return res.json({ user: publicUser(user) });
  } catch (e) {
    return next(e);
  }
}
