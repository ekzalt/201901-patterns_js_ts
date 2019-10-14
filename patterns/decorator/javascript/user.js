class User {
  /**
   * @constructor
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

module.exports = User;
