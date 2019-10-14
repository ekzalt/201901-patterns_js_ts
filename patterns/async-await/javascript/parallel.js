/**
 * ### startAll
 * @param {Promise[]} tasks
 */
const startAll = async (tasks) => {
  const allResults = await Promise.all(tasks);

  console.log(allResults);
};
