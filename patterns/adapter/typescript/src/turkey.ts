import { IFlyable, IGobblable } from './interfaces';

export default class Turkey implements IFlyable, IGobblable {
  gobble() {
    console.log('gobble gobble gobble');
  }

  fly() {
    console.log('I fly a short distance');
  }
}
