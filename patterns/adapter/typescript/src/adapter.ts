import { IFlyable, IQuackable } from './interfaces';
import Turkey from './turkey';

export default class AdapterTurkeyToDuck implements IFlyable, IQuackable {
  private _duckDistance = 2;

  private _turkey: Turkey;

  constructor(params: { turkey?:Turkey } = {}) {
    this._turkey = params.turkey || new Turkey();
  }

  fly() {
    for (let i = 0; i < this._duckDistance; i++) this._turkey.fly();
  }

  quack() {
    this._turkey.gobble();
  }
}
