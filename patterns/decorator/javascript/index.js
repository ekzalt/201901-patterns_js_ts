const { decorateFunction } = require("./decorators");
const { sum } = require("./functions");
const User = require("./user");
const UserDecorator = require("./user.decorator");

console.log(decorateFunction(sum)(1, 2));

/** @type {User} */
const user = new UserDecorator(new User("Alex"));
console.log(user.getName());
