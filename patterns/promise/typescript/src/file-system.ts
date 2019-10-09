import { promisify } from 'util';
import { readFile } from 'fs';

// convert Callback into Promise

const simpleReadFile = promisify(readFile);

type IPath = string | number | Buffer | URL;

interface IOptions {
  encoding?: string;
  flag?: string;
}

const customReadJson = (path: IPath, options?: string | IOptions): Promise<object> => new Promise((resolve, reject) => {
  readFile(path, options, (err, data) => {
    if (err) return reject(err);
    // resolve(data);

    let parsed;
    try {
      parsed = JSON.parse(data.toString());
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
