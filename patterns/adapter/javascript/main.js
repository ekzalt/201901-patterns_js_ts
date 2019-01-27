const Duck = require('./duck');
const Turkey = require('./turkey');
const AdapterTurkeyToDuck = require('./adapter');

const duck = new Duck();
/** @type {Duck} */
const fakeDuck = new AdapterTurkeyToDuck({
  turkey: new Turkey(),
});

duck.quack();
duck.fly();

fakeDuck.quack();
fakeDuck.fly();
