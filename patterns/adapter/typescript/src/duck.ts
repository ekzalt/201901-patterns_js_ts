import { IFlyable, IQuackable } from './interfaces';

export default class Duck implements IFlyable, IQuackable {
  quack() {
    console.log('quack quack quack');
  }

  fly() {
    console.log('I fly');
  }
}
