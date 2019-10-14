const Pizza = require('./pizza');
const { createPizza, createPizzaWithDI } = require('./factory-func');
const PizzaFactory = require('./factory-classic');

const pizza1 = Pizza.create('Factory method pizza');
console.log(pizza1.getType(), '\n');

const pizza2 = createPizza('Factory function pizza');
console.log(pizza2.getType(), '\n');

const pizza3 = createPizzaWithDI(Pizza)('Factory function with Dependency Injection pizza');
console.log(pizza3.getType(), '\n');

// the best way
const factory = new PizzaFactory(Pizza);
const pizza4 = factory.create('Factory classic pizza');
console.log(pizza4.getType(), '\n');
