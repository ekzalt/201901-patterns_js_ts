/**
 * ### decorateFunction
 * @param {Function} callable
 */
const decorateFunction = (callable) => (...args) => {
  console.log("some action before calling function");

  const result = callable(...args);

  console.log("some action after calling function");

  return result;
};

/**
 * ### log
 * decorate method
 * @returns {(target:Object, key:string, descriptor:PropertyDescriptor) => { value:Function }}
 */
const log = () => (target, key, descriptor) => {
  return {
    value(...args) {
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

module.exports = {
  decorateFunction,
  log,
};
