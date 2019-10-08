const EvenConsumer = require("./even-consumer");
const OddConsumer = require("./odd-consumer");
const Producer = require("./producer");

const producer = new Producer();
new EvenConsumer(producer);
new OddConsumer(producer);
