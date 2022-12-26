import http from 'http';
import ThreadStream from 'thread-stream';
import path from 'path';

const stream = new ThreadStream({
  filename: './example/worker-3.js',
  // filename: path.join(__dirname, './example/worker.js'),
  workerData: { dest: 1 },
  workerOpts: {}, // Other options to be passed to Worker
  sync: false, // default
});

let reqId = 0;

const server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {
  reqId++;
  stream.write('{ reqId, url: req.url }');
  res.end('Hello');
});
