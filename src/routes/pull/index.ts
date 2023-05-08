import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class PullService {
  public pullSword = async (username: string): Promise<boolean | string> => {
    const target = await prisma.user.findUniqueOrThrow({
        where: { username: username },
      }),
      now = new Date();
    now.setHours(now.getHours() + 9);
    if (
      target.cooldown === null ||
      now.getTime() > target.cooldown?.getTime()!
    ) {
      const tries = target.tries + 1,
        pulls = target.pulls + +!Math.floor(Math.random() * 3);
      now.setSeconds(now.getSeconds() + 10);
      const result = await prisma.user.update({
        where: { username: username },
        data: {
          ...target,
          tries: tries,
          pulls: pulls,
          cooldown: now,
          tpp: pulls > 0 ? parseFloat((tries / pulls).toPrecision(3)) : 0,
        } as User,
      });
      prisma.$disconnect();
      return target.pulls === result.pulls ? false : true;
    } else return "Too many requests, please try again later.";
  };
}

export default PullService;
