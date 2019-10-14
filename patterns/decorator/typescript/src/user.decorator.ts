import { IUser } from "./interfaces";

export class UserDecorator implements IUser {
  constructor(private readonly user: IUser) {}

  getName() {
    console.log("some action before calling method");

    const result = this.user.getName();
  
    console.log("some action after calling method");
  
    return `My name is ${result}`;
  }
}
