import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 5000,
  max: 1,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
