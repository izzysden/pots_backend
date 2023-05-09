import { User } from "@prisma/client";

export interface LeaderboardType {
  leaderboardResponses: User[];
  totalPage: number;
}
