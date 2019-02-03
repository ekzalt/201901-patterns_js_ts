import { EventEmitter } from 'events';

export const callbackWorker = (params: Object, callback: (error: Error | null, data: string) => void) => {
  // call async callback
  if (!params) return process.nextTick(() => callback(new Error('Invalid params'), ''));

  // call async callback
  process.nextTick(() => {
    // do some hard Input/Output operation with params

    callback(null, JSON.stringify(params));
  });
};

export const promiseWorker = (params: Object) => {
  if (!params) return Promise.reject(new Error('Invalid params'));

  return new Promise((resolve, reject) => {
    // do some hard Input/Output operation with params

    resolve(JSON.stringify(params));
  });
};

export const functionWorker = async (params: Object) => {
  if (!params) throw new Error('Invalid params');

  // do some hard Input/Output operation with params

  return JSON.stringify(params);
};

export const emitterWorker = (params: Object) => {
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
