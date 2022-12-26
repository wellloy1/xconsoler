import { Consoler } from '../consoler.js';
import http from 'http';

const consoler = new Consoler({
	// prefix: '[clientService]', // adds prefix string to output
	// levels: { error: false }, // disables "error" log level * consoler.error will be a noop function
	// time: 'iso', // time format is an ISO string
});

const consoler2 = new Consoler({
	levels: { log: true }, // enables "log" log level only * the other log levels will be a noop function
	time: false, // disables time output
	colors: false, // disable ANSI color styles
});

const consoler3 = new Consoler({
	levels: {}, // all the log levels will be a noop functions
});

let reqId = 0;

const server = http.createServer();

server.listen(3000);

server.on('request', (req, res) => {
	reqId++;
	consoler.log({ reqId, url: req.url });
	res.end('Hello');
});

console.log('Consoler:');
consoler.log({ reqId });
consoler.debug({ reqId });
consoler.info({ reqId });
consoler.warn({ reqId });
consoler.error({ reqId });
consoler.fatal({ reqId });

console.log('\nConsoler2:');
consoler2.log({ reqId });
consoler2.debug({ reqId });
consoler2.info({ reqId });
consoler2.warn({ reqId });
consoler2.error({ reqId });
consoler2.fatal({ reqId });

console.log('\nConsoler3:');
consoler3.log({ reqId });
consoler3.debug({ reqId });
consoler3.info({ reqId });
consoler3.warn({ reqId });
consoler3.error({ reqId });
consoler3.fatal({ reqId });
