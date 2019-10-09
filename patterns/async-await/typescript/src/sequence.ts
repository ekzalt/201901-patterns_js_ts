// Sequential Iterations

type IPromiseFunction = () => Promise<any>;

const forOfPromise = async (tasks: IPromiseFunction[]) => {
  for (const task of tasks) {
    const result = await task();

    console.log(result);
  }
};
