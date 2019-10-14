import { IUser } from "./interfaces";

export class User implements IUser {
  constructor(private readonly name: string) {}

  getName() {
    return this.name;
  }
}
