import express from "express";
import UserService from "./user";
import { UserDto } from "../types/user";
import PullService from "./pull";
import LeaderboardService from "./leaderboard";

const router = express.Router();

const user = new UserService();
router.get("/user/:username", async (req, res) =>
  res.send(await user.getUserByUsername(req.params.username))
);
router.post("/user", (req, res) =>
  res.send(user.createUser(req.body as UserDto))
);
router.delete("/user", (req, res) => res.send(user.deleteUser(req.body)));

const pull = new PullService();
router.patch("/pull/:username", async (req, res) =>
  res.send(await pull.pullSword(req.params.username))
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
