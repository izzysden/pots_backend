import express from "express";
import UserService from "./user";
import PullService from "./pull";
import LeaderboardService from "./leaderboard";
import wrapAsyncController, { apiLimiter } from "../lib/middleware";
import { UserDto } from "../types/user/dto";

const router = express.Router();

const user = new UserService();
router.get(
  "/user/:username",
  wrapAsyncController(async (req: { params: UserDto }, res: any) => {
    const result = await user.getUserByUsername(req.params.username);
    if (result === "User Not Found.")
      res.status(404).json({
        code: 404,
        message: result,
      });
    else res.send(result);
  })
);

const pull = new PullService();
router.patch(
  "/pull/:username",
  apiLimiter,
  wrapAsyncController(async (req: { params: UserDto }, res: any) => {
    const [result, status] = await pull.pullSword(req.params.username);
    if (
      result === "Inappropriate Username." ||
      result === "Invalid Username Pattern."
    )
      res.status(400).json({
        code: 400,
        message: result,
      });
    else if (result === "Too many requests, please try again later.")
      res.status(429).json({
        code: 429,
        message: result,
      });
    else res.status(status).json(result);
  })
);

const leaderboard = new LeaderboardService();
router.get("/leaderboard/tries/:page", async (req, res) =>
  res.send(await leaderboard.getTriesLeaderboard(parseInt(req.params.page)))
);
router.get("/leaderboard/pulls/:page", async (req, res) =>
  res.send(await leaderboard.getPullsLeaderboard(parseInt(req.params.page)))
);
router.get("/leaderboard/tppl/:page", async (req, res) =>
  res.send(await leaderboard.getTppLLeaderboard(parseInt(req.params.page)))
);
router.get("/leaderboard/tpph/:page", async (req, res) =>
  res.send(await leaderboard.getTppHLeaderboard(parseInt(req.params.page)))
);

export default router;
