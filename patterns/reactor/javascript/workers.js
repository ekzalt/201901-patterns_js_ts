const { EventEmitter } = require('events');

/**
 * asyncWorker
 * @param {*} params
 * @param {(error:Error, data) => void} callback
 */
const callbackWorker = (params, callback) => {
  // call async callback
  if (!params) return process.nextTick(() => callback(new Error('Invalid params')));

  // call async callback
  process.nextTick(() => {
    // do some hard Input/Output operation with params

    callback(null, JSON.stringify(params));
  });
};

const promiseWorker = params => {
  if (!params) return Promise.reject(new Error('Invalid params'));

  return new Promise((resolve, reject) => {
    // do some hard Input/Output operation with params

    resolve(JSON.stringify(params));
  });
};

const functionWorker = async params => {
  if (!params) throw new Error('Invalid params');

  // do some hard Input/Output operation with params

  return JSON.stringify(params);
};

const emitterWorker = params => {
  const emitter = new EventEmitter();

  if (!params) {
    // emit async
    process.nextTick(() => emitter.emit('error', new Error('Invalid params')));
  } else {
    // emit async
    process.nextTick(() => {
      // do some hard Input/Output operation with params

      emitter.emit('data', JSON.stringify(params));
    });
  }

  return emitter;
};

module.exports = {
  callbackWorker,
  promiseWorker,
  functionWorker,
  emitterWorker,
};
