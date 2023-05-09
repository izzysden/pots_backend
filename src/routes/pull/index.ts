import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class PullService {
  public pullSword = async (username: string): Promise<boolean | string> => {
    const result = await prisma.$transaction(async (prisma) => {
      let target: User;
      try {
        target = await prisma.user.findUniqueOrThrow({
          where: { username: username },
        });
      } catch {
        target = await prisma.user.create({
          data: { username: username },
        });
      }
      const now = new Date();
      if (
        target.cooldown === null ||
        now.getTime() > target.cooldown?.getTime()!
      ) {
        const tries = target.tries + 1,
          pulls = target.pulls + +!Math.floor(Math.random() * 100);
        now.setSeconds(now.getSeconds() + 5);
        const result: User = await prisma.user.update({
          where: { username: username },
          data: {
            ...target,
            tries: tries,
            pulls: pulls,
            cooldown: now,
            tpp: pulls > 0 ? parseFloat((tries / pulls).toPrecision(3)) : 0,
          },
        });
        return target.pulls === result.pulls ? false : true;
      } else return "Too many requests, please try again later.";
    });
    prisma.$disconnect();
    return result;
  };
}

export default PullService;
