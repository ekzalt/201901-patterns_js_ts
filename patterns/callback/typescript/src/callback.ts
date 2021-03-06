import { Callback } from './type';

const syncAdd = (a: number, b: number, callback: Callback): void => callback(null, a + b);

const asyncAdd = (a: number, b: number, callback: Callback): void => {
  process.nextTick(() => callback(null, a + b));
};

// how to use
asyncAdd(1, 2, (err, result) => {
  if (err) return console.error(err);

  console.log(result);
});
