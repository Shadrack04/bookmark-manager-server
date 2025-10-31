import aj from "../config/arcjet.js";

export const arcjectMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many request" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot not allowed" });
      }

      return res.status(403).json({ error: "Access denied" });
    }
    return next();
  } catch (error) {
    console.log("Arcjet error", error);
    return next(error);
  }
};
