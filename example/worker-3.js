import fs from 'fs';
import { once } from 'events';

async function run(opts) {
  const stream = fs.createWriteStream(opts.dest);
  await once(stream, 'open');
  return stream;
}

export default run;
