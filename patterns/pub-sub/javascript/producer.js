const { EventEmitter } = require("events");

/**
 * @typedef IData
 * @property {number} data
 */

class Producer {
  constructor() {
    this.name = "producer";
    /** @type {EventEmitter[]} */
    this.subscribers = [];

    this.intervalId = setInterval(() => {
      /** @type {IData} */
      const data = { data: Math.round(Math.random() * 100) };
      console.log(this.name, data);

      this.subscribers.forEach((e) => e.emit(data.data % 2 === 0 ? "even" : "odd", data));
    }, 1000);

    setTimeout(() => {
      console.log("--- stop ---", this.name);
      clearInterval(this.intervalId);
    }, 20 * 1000);
  }

  /**
   * ### subscribe
   * @param {EventEmitter} emitter 
   */
  subscribe(emitter) {
    return this.subscribers.push(emitter);
  }

  /**
   * ### unsubscribe
   * @param {EventEmitter} emitter 
   */
  unsubscribe(emitter) {
    this.subscribers = this.subscribers.filter((e) => e !== emitter);

    return emitter;
  }

  clear() {
    this.subscribers = [];
  }
}

module.exports = Producer;
