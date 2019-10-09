const startAll = async (tasks: Promise<any>[]) => {
  const allResults = await Promise.all(tasks);

  console.log(allResults);
};
