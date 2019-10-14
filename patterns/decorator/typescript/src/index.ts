import { decorateFunction } from "./decorators";
import { sum } from "./functions";
import { IUser } from "./interfaces";
import { User } from "./user";
import { UserDecorator } from "./user.decorator";
import { Repository } from "./repository";

console.log(decorateFunction<number>(sum)(1, 2));

const user: IUser = new UserDecorator(new User("Alex"));
console.log(user.getName());

// with typescript decorator
const repository = new Repository();
console.log(repository.getUserByName("Max"));
