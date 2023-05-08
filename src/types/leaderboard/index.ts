import { UserEntity } from "../user";

export interface LeaderboardEntity {
  leaderboardResponses: UserEntity[];
  totalPage: number;
}
