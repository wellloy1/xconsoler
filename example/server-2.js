import http from 'http';

import { Worker } from 'worker_threads';

const worker = new Worker('./example/worker.js');

let reqId = 0;

const server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {
  reqId++;
  worker.postMessage({ reqId, url: req.url });
  res.end('Hello');
});
