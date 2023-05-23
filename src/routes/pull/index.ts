import { PrismaClient, User } from "@prisma/client";
import fs from "fs";
import { PullSwordType } from "../../types/pull";
const prisma = new PrismaClient();

class PullService {
  public pullSword = async (
    username: string
  ): Promise<(string | number | PullSwordType)[]> => {
    let status: number;
    const result = await prisma.$transaction(async (prisma) => {
      let target: User;
      try {
        target = await prisma.user.findUniqueOrThrow({
          where: { username: username },
        });
        status = 200;
      } catch {
        // if user cannot be found
        const googleProfanity = fs.readFileSync(
          "src/lib/constant/profanity.txt",
          "utf8"
        );
        for (const word of googleProfanity.replace(/\r/g, "").split(/\n/)) {
          const regex = new RegExp(word, "gi");
          if (regex.test(username) === true) {
            return "Inappropriate Username.";
          }
        }
        const regex = /^[a-zA-Z0-9\_]{3,16}$/g; // a-z, A-Z, 0-9, _, 3~16
        if (regex.test(username)) {
          target = await prisma.user.create({
            data: { username: username },
          });
          status = 201;
        } else return "Invalid Username Pattern.";
      }
      const now = new Date();
      if (
        target.cooldown === null ||
        now.getTime() > target.cooldown?.getTime()!
      ) {
        const tries = target.tries + 1,
          pulls = target.pulls + +!Math.floor(Math.random() * 5);
        now.setSeconds(now.getSeconds() + 20);
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
        return {
          userResponse: result,
          pulled: target.pulls === result.pulls ? false : true,
        };
      } else return "Too many requests, please try again later.";
    });
    prisma.$disconnect();
    return [result, status!];
  };
}

export default PullService;
