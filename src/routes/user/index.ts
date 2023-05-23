import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class UserService {
  public getUserByUsername = async (
    username: string
  ): Promise<User | string> => {
    let result: User;
    try {
      result = await prisma.user.findUniqueOrThrow({
        where: { username: username },
      });
    } catch {
      return "User Not Found.";
    }
    prisma.$disconnect();
    return result;
  };
}

export default UserService;
