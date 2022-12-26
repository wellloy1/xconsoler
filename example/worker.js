import { parentPort, threadId } from 'worker_threads';
import { Consoler } from '../Consoler.js';

console.log(`Worker has been started`, { threadId });

const consoler = new Consoler({
  //   prefix: '[clientService]', // adds prefix string to output
  //   levels: { error: false }, // disables "error" log level * consoler.error will be a noop function
  time: 'unix', // time format is an ISO string
  colors: 0,
});

parentPort.on('message', (data) => {
  consoler.log(data);
});

consoler.log({ a: 1 });
