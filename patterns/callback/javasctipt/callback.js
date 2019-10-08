/**
 * ### syncAdd
 * it uses sync callback
 * @param {number} a
 * @param {number} b
 * @param {(err?:Error, result?:number) => void} callback
 */
const syncAdd = (a, b, callback) => callback(null, a + b);

/**
 * ### asyncAdd
 * it uses async callback
 * @param {number} a
 * @param {number} b
 * @param {(err?:Error, result?:number) => void} callback
 */
const asyncAdd = (a, b, callback) => {
  process.nextTick(() => callback(null, a + b));
};

// how to use
asyncAdd(1, 2, (err, result) => {
  if (err) return console.error(err);

  console.log(result);
});
