const Turkey = require('./turkey');

class AdapterTurkeyToDuck {
  /**
   * @constructor
   * @param {{ turkey?:Turkey }=} params
   */
  constructor(params = {}) {
    this._duckDistance = 2;

    this._turkey = params.turkey || new Turkey();
  }

  fly() {
    for (let i = 0; i < this._duckDistance; i++) this._turkey.fly();
  }

  quack() {
    this._turkey.gobble();
  }
}

module.exports = AdapterTurkeyToDuck;
