import http from 'http';
import pino from 'pino';
import pretty from 'pino-pretty';

let reqId = 0;

const server = http.createServer();
const logger = pino({
  base: undefined,
  prettifier: pretty,
});

server.listen(3000);

server.on('request', (req, res) => {
  reqId++;
  logger.info({ reqId, url: req.url });
  res.end('Hello');
});

logger.info({ reqId });
