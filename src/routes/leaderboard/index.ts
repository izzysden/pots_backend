import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
const pageSize = 20;

class LeaderboardService {
  public getTriesLeaderboard = async (page: number): Promise<User[]> => {
    const offset = (page - 1) * pageSize;
    const result = await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        tries: "desc",
      },
    });
    prisma.$disconnect();
    return result;
  };
  public getPullsLeaderboard = async (page: number): Promise<User[]> => {
    const offset = (page - 1) * pageSize;
    const result = await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        pulls: "desc",
      },
    });
    prisma.$disconnect();
    return result;
  };
  public getTppLLeaderboard = async (page: number): Promise<User[]> => {
    const offset = (page - 1) * pageSize;
    const result = await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        pulls: {
          gt: 0,
        },
      },
      orderBy: {
        pulls: "desc",
      },
    });
    prisma.$disconnect();
    return result;
  };
  public getTppHLeaderboard = async (page: number): Promise<User[]> => {
    const offset = (page - 1) * pageSize;
    const result = await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        pulls: {
          gt: 0,
        },
      },
      orderBy: {
        pulls: "asc",
      },
    });
    prisma.$disconnect();
    return result;
  };
}

export default LeaderboardService;
