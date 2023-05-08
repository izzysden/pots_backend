import { PrismaClient } from "@prisma/client";
import { LeaderboardEntity } from "../../types/leaderboard";
import { UserEntity } from "../../types/user";
const prisma = new PrismaClient();
const pageSize = 20;

class LeaderboardService {
  public getTriesLeaderboard = async (
    page: number
  ): Promise<LeaderboardEntity> => {
    const offset = (page - 1) * pageSize;
    const result = (await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        tries: "desc",
      },
    })) as UserEntity[];
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(result.length / 20),
    };
  };
  public getPullsLeaderboard = async (
    page: number
  ): Promise<LeaderboardEntity> => {
    const offset = (page - 1) * pageSize;
    const result = (await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        pulls: "desc",
      },
    })) as UserEntity[];
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(result.length / 20),
    };
  };
  public getTppLLeaderboard = async (
    page: number
  ): Promise<LeaderboardEntity> => {
    const offset = (page - 1) * pageSize;
    const result = (await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        pulls: {
          gt: 0,
        },
      },
      orderBy: {
        tpp: "asc",
      },
    })) as UserEntity[];
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(result.length / 20),
    };
  };
  public getTppHLeaderboard = async (
    page: number
  ): Promise<LeaderboardEntity> => {
    const offset = (page - 1) * pageSize;
    const result = (await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        pulls: {
          gt: 0,
        },
      },
      orderBy: {
        tpp: "desc",
      },
    })) as UserEntity[];
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(result.length / 20),
    };
  };
}

export default LeaderboardService;
