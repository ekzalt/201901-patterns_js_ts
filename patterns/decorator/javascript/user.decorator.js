const User = require("./user");

class UserDecorator {
  /**
   * @constructor
   * @param {User} user
   */
  constructor(user) {
    this.user = user;
  }

  getName() {
    console.log("some action before calling method");

    const result = this.user.getName();
  
    console.log("some action after calling method");
  
    return `My name is ${result}`;
  }
}

module.exports = UserDecorator;
