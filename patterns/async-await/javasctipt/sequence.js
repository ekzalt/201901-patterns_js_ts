// Sequential Iterations

/**
 * ### forOfPromise
 * async/await
 * @param {(() => Promise)[]} tasks
 */
const forOfPromise = async (tasks) => {
  for (const task of tasks) {
    const result = await task();

    console.log(result);
  }
};
