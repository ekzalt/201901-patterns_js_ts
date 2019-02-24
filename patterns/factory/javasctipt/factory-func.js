const Pizza = require('./pizza');

/**
 * ### createPizza
 * Problem with Dependency Injection support
 * 
 * @param {string=} type
 */
const createPizza = type => {
  const pizza = new Pizza(type);

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
};

/**
 * ### createPizzaWithDI
 * To support Dependency Injection you need to create closure.
 * You can use any sub-class Pizza what you need.
 * 
 * @param {Pizza=} pizzaClass
 * @returns {(type?:string) => Pizza}
 */
const createPizzaWithDI = (pizzaClass = Pizza) => type => {
  /** @type {Pizza} */
  const pizza = new pizzaClass(type);

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
};

module.exports = {
  createPizza,
  createPizzaWithDI,
};
