#! /usr/bin/env nodejs

'use strict';

const path = require('path');
const url = require('url');
const http = require('http');
const fs = require('fs');

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
    sendResponse(res, {});
});

server.listen(process.argv[2]);
