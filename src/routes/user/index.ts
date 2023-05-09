import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class UserService {
  public getUserByUsername = async (username: string): Promise<User> => {
    const result: User = await prisma.user.findUniqueOrThrow({
      where: { username: username },
    });
    prisma.$disconnect();
    return result;
  };
}

export default UserService;
