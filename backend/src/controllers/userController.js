import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
});
export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "Account not found." });
    return res.json({ user: publicUser(user) });
  } catch (e) {
    return next(e);
  }
}
export async function updateProfile(req, res, next) {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId).select("+password");
    if (!user) return res.status(404).json({ message: "Account not found." });
    if (
      email &&
      email.toLowerCase() !== user.email &&
      (await User.exists({ email: email.toLowerCase() }))
    )
      return res
        .status(409)
        .json({ message: "An account with that email already exists." });
    if (newPassword) {
      if (!(await bcrypt.compare(currentPassword, user.password)))
        return res
          .status(400)
          .json({ message: "Current password is incorrect." });
      user.password = await bcrypt.hash(newPassword, 12);
    }
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    await user.save();
    return res.json({ user: publicUser(user) });
  } catch (e) {
    return next(e);
  }
}
