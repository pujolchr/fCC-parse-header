#! /usr/bin/env node

// FIXME: need a nice comment for documentation here
// TODO: some output on process.stdout for loging

const path = require('path');
const http = require('http');
const useragent = require('useragent');

if (process.argv.length !== 3) {
  process.stderr.write(`usage: ${path.basename(process.argv[1])} port\n`);
  process.exit(1);
}

const sendResponse = (r, data) => {
  r.writeHead(200, { 'content-type': 'application/json' });
  r.write(JSON.stringify(data));
  r.end();
};

const server = http.createServer((req, res) => {
  const payload = {};

  // get the os
  payload.software = useragent.parse(req.headers['user-agent']).os.family;

  // get the language if any
  const language = req.headers['accept-language'];
  if (language) {
    [payload.language] = language.split(',');
  } else {
    payload.language = null;
  }

  // find the IP adress
  payload.ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;

  // if x-forwarded-for supress the proxies
  payload.ip = payload.ip.replace(/,.*$/, '');

  sendResponse(res, payload);
});

server.listen(process.argv[2]);
