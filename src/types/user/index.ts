export interface UserEntity {
  username: string;
  tries: number;
  pulls: number;
  cooldown?: Date | null;
  tpp: number;
}
