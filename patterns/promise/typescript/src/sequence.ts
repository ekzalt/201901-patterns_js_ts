// Sequential Iterations

type IPromiseFunction = () => Promise<any>;

const forEachPromise = (tasks: IPromiseFunction[]) => {
  let promise = Promise.resolve();

  tasks.forEach(task => {
    promise = promise.then(() => task());
  });

  return promise;
};

const reducePromise = (tasks: IPromiseFunction[]) => tasks.reduce((prev, task) => prev.then(() => task()), Promise.resolve());
