import { IPizza } from './interfaces';

// Substack design pattern
export default class Pizza implements IPizza {
  protected type: string;

  constructor(type?: string) {
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
   */
  static create(type?: string) {
    const pizza = new Pizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}
