class Pizza {
  /**
   * @constructor
   * @param {string=} type
   */
  constructor(type) {
    this.type = type || 'Default Pizza';
  }

  getType() {
    return this.type;
  }

  prepare() {
    console.log('prepare pizza');
  }

  bake() {
    console.log('bake pizza');
  }

  cut() {
    console.log('cut pizza');
  }

  box() {
    console.log('box pizza');
  }

  /**
   * ### create
   * - Factory method
   * - Facade method
   * 
   * @method
   * @param {string=} type
   */
  static create(type) {
    const pizza = new Pizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

// Substack design pattern
module.exports = Pizza;
