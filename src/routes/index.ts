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
    switch (result) {
      case "User Not Found.":
        res.status(404).json({
          code: 404,
          message: result,
        });
        break;
      default:
        res.send(result);
        break;
    }
  })
);
const pull = new PullService();
router.patch(
  "/pull/:username",
  apiLimiter,
  wrapAsyncController(async (req: { params: UserDto }, res: any) => {
    const result = await pull.pullSword(req.params.username);
    switch (result) {
      case "Inappropriate Username.":
      case "Invalid Username Pattern.":
        res.status(400).json({
          code: 400,
          message: result,
        });
        break;
      case "Too many requests, please try again later.":
        res.status(429).json({
          code: 429,
          message: result,
        });
        break;
      default:
        res.status(200).json(result);
        break;
    }
  })
);
const leaderboard = new LeaderboardService();
router.get(
  "/leaderboard/tries/:page",
  wrapAsyncController(async (req: { params: { page: string } }, res: any) =>
    res.send(await leaderboard.getTriesLeaderboard(parseInt(req.params.page)))
  )
);
router.get(
  "/leaderboard/pulls/:page",
  wrapAsyncController(async (req: { params: { page: string } }, res: any) =>
    res.send(await leaderboard.getPullsLeaderboard(parseInt(req.params.page)))
  )
);
router.get(
  "/leaderboard/tppl/:page",
  wrapAsyncController(async (req: { params: { page: string } }, res: any) =>
    res.send(await leaderboard.getTppLLeaderboard(parseInt(req.params.page)))
  )
);
router.get(
  "/leaderboard/tpph/:page",
  wrapAsyncController(async (req: { params: { page: string } }, res: any) =>
    res.send(await leaderboard.getTppHLeaderboard(parseInt(req.params.page)))
  )
);
export default router;
