const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const file = process.argv[2];

createReadStream(file)
  .pipe(createGzip())
  .pipe(createWriteStream(file + '.gz'))
  .on('finish', () => console.log(file + ' successfully compressed'));

// how to use
// node gzip.js <filename>
