// Sequential Iterations

/**
 * ### forEachPromise
 * @param {(() => Promise)[]} tasks
 */
const forEachPromise = (tasks) => {
  let promise = Promise.resolve();

  tasks.forEach(task => {
    promise = promise.then(() => task());
  });

  return promise;
};

/**
 * ### reducePromise
 * @param {(() => Promise)[]} tasks
 */
const reducePromise = (tasks) => tasks.reduce((prev, task) => prev.then(() => task()), Promise.resolve());
