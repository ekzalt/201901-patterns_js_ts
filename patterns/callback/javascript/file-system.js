const { readFile } = require('fs');

/**
 * ### readJson
 * @param {string} filename
 * @param {(err?:Error, result?) => void} callback
 */
const readJson = (filename, callback) => {
  readFile(filename, 'utf8', (err, data) => {
    if (err) return callback(err);

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }

    callback(null, parsed);
  });
};
