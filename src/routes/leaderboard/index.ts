import { PrismaClient } from "@prisma/client";
import { LeaderboardType } from "../../types/leaderboard";
const prisma = new PrismaClient();
const pageSize = 20;

class LeaderboardService {
  public getTriesLeaderboard = async (
    page: number
  ): Promise<LeaderboardType> => {
    const offset = (page - 1) * pageSize;
    const [result, count] = await prisma.$transaction([
      prisma.user.findMany({
        orderBy: {
          tries: "desc",
        },
        skip: offset,
        take: pageSize,
      }),
      prisma.user.count(),
    ]);
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(count / pageSize),
    };
  };
  public getPullsLeaderboard = async (
    page: number
  ): Promise<LeaderboardType> => {
    const offset = (page - 1) * pageSize;
    const [result, count] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          pulls: {
            gt: 0,
          },
        },
        orderBy: {
          pulls: "desc",
        },
        skip: offset,
        take: pageSize,
      }),
      prisma.user.count({
        where: {
          pulls: {
            gt: 0,
          },
        },
      }),
    ]);
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(count / pageSize),
    };
  };
  public getTppLLeaderboard = async (
    page: number
  ): Promise<LeaderboardType> => {
    const offset = (page - 1) * pageSize;
    const [result, count] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          pulls: {
            gt: 0,
          },
        },
        orderBy: {
          tpp: "asc",
        },
        skip: offset,
        take: pageSize,
      }),
      prisma.user.count({
        where: {
          pulls: {
            gt: 0,
          },
        },
      }),
    ]);
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(count / pageSize),
    };
  };
  public getTppHLeaderboard = async (
    page: number
  ): Promise<LeaderboardType> => {
    const offset = (page - 1) * pageSize;
    const [result, count] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          pulls: {
            gt: 0,
          },
        },
        orderBy: {
          tpp: "desc",
        },
        skip: offset,
        take: pageSize,
      }),
      prisma.user.count({
        where: {
          pulls: {
            gt: 0,
          },
        },
      }),
    ]);
    prisma.$disconnect();
    return {
      leaderboardResponses: result,
      totalPage: Math.ceil(count / pageSize),
    };
  };
}

export default LeaderboardService;
