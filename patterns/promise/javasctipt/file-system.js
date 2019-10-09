const { promisify } = require('util');
const { readFile } = require('fs');

// convert Callback into Promise

const simpleReadFile = promisify(readFile);

/**
 * ### customReadJson
 * @param {string} path
 * @param {Object} options
 */
const customReadJson = (path, options) => new Promise((resolve, reject) => {
  readFile(path, options, (err, data) => {
    if (err) return reject(err);
    // resolve(data);

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return reject(err);
    }

    resolve(parsed);
  });
});

// how to use

customReadJson('hello.json')
  .then(console.log)
  .catch(console.error);
