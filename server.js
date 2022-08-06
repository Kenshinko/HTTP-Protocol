const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = 8080;

const requestListener = (req, res) => {
  if (req.url === '/get' && req.method === 'GET') {
    fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal server error');
      } else {
        res.writeHead(200);
        res.end(files.join(', '));
      }
    });
  } else if ((req.url === '/delete' && req.method === 'DELETE') ||
             (req.url === '/post' && req.method === 'POST')) {
      res.writeHead(200);
      res.end('Success');
  } else if (req.url === '/redirect' && req.method === 'GET') {
    res.writeHead(301);
    res.end(`Resourse is now permanently available at http://${host}:${port}/redirected`);
  } else {
    res.writeHead(405);
    res.end('HTTP method not allowed');
  }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Сервер запущен и доступен по адресу http://${host}:${port}`);
});