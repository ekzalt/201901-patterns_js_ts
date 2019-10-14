const { createHmac } = require("crypto");

class TokenService {
  constructor() {
    this.createHmac = createHmac;
  }

  /**
   * ### getToken
   * @param {string} secret 
   */
  getToken(secret) {
    return this.createHmac('sha256', secret)
      .update('My secret text')
      .digest('hex');
  }
}

module.exports = TokenService;
