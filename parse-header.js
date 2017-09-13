#! /usr/bin/env nodejs

'use strict';

const path = require('path');
const url = require('url');
const http = require('http');
const fs = require('fs');
const dns = require('dns');

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
  let payload = {};
  console.log(req.headers);
  payload['user-agent'] = req.headers['user-agent'];
  payload.language = req.headers['accept-language'];
  dns.resolve4(req.headers.host.replace(/:.*$/, ''), addr => {
    payload.ip = addr;
    sendResponse(res, payload);
  });
});

server.listen(process.argv[2]);
