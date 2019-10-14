import { User } from "./user";
import { log } from "./decorators";

export class Repository {
  @log()
  getUserByName(name: string): User {
    return new User(name);
  }
}
