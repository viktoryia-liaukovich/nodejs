const http = require('http');
const createUser = require('./routes/createUser');

const routes = {
  POST: {
    '/user': createUser
  },
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}/`);

  const route = routes[req.method][url.pathname];

  if (route) {
    route(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

