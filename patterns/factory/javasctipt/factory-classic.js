const Pizza = require('./pizza');

class PizzaFactory {
  /**
   * You can use any sub-class Pizza what you need.
   * 
   * @constructor
   * @param {Pizza} pizzaClass
   */
  constructor(pizzaClass) {
    this.pizzaClass = pizzaClass || Pizza;
  }

  /**
   * @method
   * @param {string=} type
   */
  create(type) {
    /** @type {Pizza} */
    const pizza = new this.pizzaClass(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

// Substack design pattern
module.exports = PizzaFactory;
