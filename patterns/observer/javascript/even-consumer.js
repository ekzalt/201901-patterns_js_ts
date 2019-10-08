const { EventEmitter } = require("events");

const Producer = require("./producer");

/**
 * @typedef IData
 * @property {number} data
 */

class EvenConsumer extends EventEmitter {
  /**
   * @constructor
   * @param {Producer} producer
   */
  constructor(producer) {
    super();

    this.name = "even";
    this.producer = producer;

    this.on("even", this.process);
    this.producer.subscribe(this);

    setTimeout(() => {
      console.log("--- unsubscribe ---", this.name);
      this.producer.unsubscribe(this);
    }, 15 * 1000);
  }

  /**
   * ### process
   * @param {IData} data
   */
  async process(data) {
    console.log(this.name, data);
  }
}

module.exports = EvenConsumer;
