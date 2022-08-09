const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8080;

const requestListener = (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/get') {
      fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal server error');
        } else {
          res.writeHead(200);
          res.end(files.join(', '));
        }
      });
    }
    if (req.url === '/redirect') {
      res.writeHead(301, {'Location': `http://${host}:${port}/redirected`});
      res.end(`Resourse is now permanently available at http://${host}:${port}/redirected`);
    }
    if (req.url === '/') {
      res.writeHead(404);
      res.end('Route not found');
    }
  } else if (req.method === 'POST' || req.method === 'DELETE') {
    if (req.method === req.url.slice(1).toUpperCase()) {
      res.writeHead(200);
      res.end('Success');
    } else {
      res.writeHead(405);
      res.end('HTTP method not allowed');
    }
  } else {
    res.writeHead(405);
    res.end('HTTP method not allowed');
  }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Сервер запущен и доступен по адресу http://${host}:${port}`);
});