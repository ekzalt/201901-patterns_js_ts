import { readFile } from 'fs';
import { Callback } from './type';

const readJson = (filename: string, callback: Callback): void => {
  readFile(filename, 'utf8', (err, data) => {
    if (err) return callback(err);

    let parsed: object;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }

    callback(null, parsed);
  });
};
