const {
  callbackWorker,
  promiseWorker,
  functionWorker,
  emitterWorker,
} = require('./workers');

const user = { name: 'Vasya', age: 30 };

console.log('before callback');
callbackWorker(user, (error, data) => {
  if (error) return console.error(error);

  console.log(`data callback: ${data}`);
});
console.log('after callback\n');


console.log('before promise');
promiseWorker(user)
  .then(data => console.log(`data promise: ${data}`))
  .catch(console.error);
console.log('after promise\n');


console.log('before async');
functionWorker(user)
  .then(data => console.log(`data async: ${data}`))
  .catch(console.error);
console.log('after async\n');


console.log('before emitter');
const emitterInstance = emitterWorker(user);

emitterInstance
  .on('data', data => console.log(`data emitter: ${data}`))
  .on('error', console.error);
console.log('after emitter\n');
// emit sync
emitterInstance.emit('data', JSON.stringify(user));

console.log('\n--- end of sync flow ---\n');
