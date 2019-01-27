import Duck from './duck';
import Turkey from './turkey';
import AdapterTurkeyToDuck from './adapter';

const duck: Duck = new Duck();
const fakeDuck: Duck = new AdapterTurkeyToDuck({
  turkey: new Turkey(),
});

duck.quack();
duck.fly();

fakeDuck.quack();
fakeDuck.fly();
