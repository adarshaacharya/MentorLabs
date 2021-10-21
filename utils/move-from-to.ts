import fs from 'fs-extra';
import path from 'path';

if (process.argv.length < 3 && process.argv.length > 4) {
  throw new Error('Need to set source and dest path');
}

const source = path.resolve(__dirname, '..', process.argv[2]);
const dest = path.resolve(__dirname, '..', process.argv[3]);

fs.move(source, dest, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Files successful moved!');
});
