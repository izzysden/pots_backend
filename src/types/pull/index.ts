import { User } from "@prisma/client";

export interface PullSwordType {
  userResponse: User;
  pulled: boolean;
}
