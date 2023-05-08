import { PrismaClient } from "@prisma/client";
import { UserDto } from "../../types/user/dto";
import { UserEntity } from "../../types/user";
const prisma = new PrismaClient();

class UserService {
  public getUserByUsername = async (username: string): Promise<UserEntity> => {
    const result = (await prisma.user.findUniqueOrThrow({
      where: { username: username },
    })) as UserEntity;
    prisma.$disconnect();
    return result;
  };

  public createUser = async (user: UserDto): Promise<UserEntity> => {
    const result = (await prisma.user.create({
      data: user,
    })) as UserEntity;
    prisma.$disconnect();
    return result;
  };

  public deleteUser = async (user: UserDto): Promise<UserEntity> => {
    const result = (await prisma.user.delete({
      where: { username: user.username },
    })) as UserEntity;
    prisma.$disconnect();
    return result;
  };
}

export default UserService;
