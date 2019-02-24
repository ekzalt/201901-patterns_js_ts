import Pizza from './pizza';

// Substack design pattern
export default class PizzaFactory {
  protected pizzaClass: typeof Pizza;

  /**
   * You can use any sub-class Pizza what you need.
   */
  constructor(pizzaClass: typeof Pizza) {
    this.pizzaClass = pizzaClass || Pizza;
  }

  create(type?: string) {
    const pizza: Pizza = new this.pizzaClass(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}
