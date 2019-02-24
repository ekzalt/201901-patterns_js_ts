import Pizza from './pizza';

/**
 * ### createPizza
 * Problem with Dependency Injection support
 */
export const createPizza = (type?: string) => {
  const pizza: Pizza = new Pizza(type);

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
 */
export const createPizzaWithDI = (pizzaClass = Pizza) => (type?: string) => {
  const pizza: Pizza = new pizzaClass(type);

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();

  return pizza;
};
