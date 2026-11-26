export function notFound(_req, res) {
  return res
    .status(404)
    .json({ message: "The requested endpoint was not found." });
}
export function errorHandler(error, _req, res, _next) {
  if (error?.code === 11000)
    return res
      .status(409)
      .json({ message: "An account with that email already exists." });
  if (error?.type === "entity.too.large")
    return res.status(413).json({ message: "The request is too large." });
  const status = Number.isInteger(error?.status) ? error.status : 500;
  if (status >= 500)
    console.error("API request failed:", error?.name || "UnknownError");
  const message =
    status === 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong on the server."
      : error?.message || "Something went wrong on the server.";
  return res.status(status).json({ message });
}
