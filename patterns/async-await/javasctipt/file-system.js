const { promisify } = require('util');
const { readFile } = require('fs');

const run = async () => {
  const simpleReadFile = promisify(readFile);
  const fileContent = await simpleReadFile('hello.json');

  console.log(fileContent.toString());
};

run();
