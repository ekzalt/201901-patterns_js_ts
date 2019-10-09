import { promisify } from 'util';
import { readFile } from 'fs';

const run = async (): Promise<void> => {
  const simpleReadFile = promisify(readFile);
  const fileContent = await simpleReadFile('hello.json');

  console.log(fileContent.toString());
};

run();
