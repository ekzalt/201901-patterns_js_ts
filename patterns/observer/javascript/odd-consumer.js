const { EventEmitter } = require("events");

const Producer = require("./producer");

/**
 * @typedef IData
 * @property {number} data
 */

class OddConsumer extends EventEmitter {
  /**
   * @constructor
   * @param {Producer} producer
   */
  constructor(producer) {
    super();

    this.name = "odd";
    this.producer = producer;

    this.on("odd", this.process);
    this.producer.subscribe(this);

    setTimeout(() => {
      console.log("--- unsubscribe ---", this.name);
      this.producer.unsubscribe(this);
    }, 10 * 1000);
  }

  /**
   * ### process
   * @param {IData} data
   */
  async process(data) {
    console.log(this.name, data);
  }
}

module.exports = OddConsumer;
