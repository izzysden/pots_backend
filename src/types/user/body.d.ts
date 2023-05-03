export interface UserBody {
  username: string;
  tries: number;
  pulls: number;
  cooldown?: Date | null;
  tpp: number;
  [k: string]: unknown;
}
