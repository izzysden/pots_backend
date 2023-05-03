import { UserDto } from "../../types/user";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

class UserService {
  public getUserByUsername = async (username: string): Promise<User> => {
    const result = await prisma.user.findUniqueOrThrow({
      where: { username: username },
    });
    prisma.$disconnect();
    return result;
  };

  public createUser = async (user: UserDto): Promise<User> => {
    const result = await prisma.user.create({
      data: user,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteUser = async (user: UserDto): Promise<User> => {
    const result = await prisma.user.delete({
      where: { username: user.username },
    });
    prisma.$disconnect();
    return result;
  };
}

export default UserService;
