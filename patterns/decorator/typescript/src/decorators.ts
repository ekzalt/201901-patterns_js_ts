export const decorateFunction = <T = any>(callable: Function) => (...args: any[]): T => {
  console.log("some action before calling function");

  const result: T = callable(...args);

  console.log("some action after calling function");

  return result;
};

// decorate method
export const log = () => (target: object, key: string, descriptor: PropertyDescriptor) => {
  return {
    value(...args: any[]) {
      // console.log("some action before calling method");
      const strArgs = args.map(arg => JSON.stringify(arg)).join();

      const result = descriptor.value.apply(this, args);
      
      // console.log("some action after calling method");
      const strResult = JSON.stringify(result);
      console.log(`Call: ${key}(${strArgs}) => ${strResult}`);

      return result;
    }
  };
}
