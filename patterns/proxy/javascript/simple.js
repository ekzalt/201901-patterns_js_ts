const TokenService = require("./token.service");

// Attention! This is only the pattern example. It is not secure to use this class.

class SimpleProxy {
  /**
   * @constructor
   * @param {TokenService} target 
   */
  constructor(target) {
    this.target = target;
    this.secret = "123"
  }
  
  /**
   * ### getToken
   * @param {string} secret 
   */
  getToken(secret) {
    if (secret !== this.secret) throw new Error("Forbidden");

    return this.target.getToken(secret);
  }

  static create() {
    return new SimpleProxy(new TokenService());
  }
}

module.exports = SimpleProxy;
