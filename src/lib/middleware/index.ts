import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 1000 * 20,
  max: 1,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const wrapAsyncController = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default wrapAsyncController;
