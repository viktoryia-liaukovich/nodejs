import { users } from "../data/users";

export const getUserById = (id: string) => {
  return users[id];
}