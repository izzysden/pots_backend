import express from "express";
import UserService from "./user";
import PullService from "./pull";
import LeaderboardService from "./leaderboard";
import { apiLimiter } from "../middleware";

const router = express.Router();

const user = new UserService();
router.get("/user/:username", async (req, res) => {
  try {
    res.send(await user.getUserByUsername(req.params.username));
  } catch {
    res.status(404).json({
      code: 404,
      message: "User Not Found!",
    });
  }
});

const pull = new PullService();
router.patch("/pull/:username", apiLimiter, async (req, res) => {
  const result = await pull.pullSword(req.params.username);
  if (result === true || result === false) res.send(result);
  else
    res.status(429).json({
      code: 429,
      message: result,
    });
});

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
