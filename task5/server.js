const http = require('http');
const createUser = require('./routes/createUser');
const deleteUser = require('./routes/deleteUser');
const updateUser = require('./routes/updateUser');
const getUserById = require('./routes/getUserById');
const getUsersList = require('./routes/getUsersList');
const deleteHobbies = require('./routes/deleteHobbies');
const updateHobbies = require('./routes/updateHobbies');
const getUserHobbies = require('./routes/getUserHobbies');

const routes = {
  POST: {
    '/user': createUser
  },
  DELETE: {
    '/user/:id': deleteUser,
    '/user/hobbies/:id': deleteHobbies,
  },
  PATCH: {
    '/user/:id': updateUser,
    '/user/hobbies/:id': updateHobbies,
  },
  GET: {
    '/user/:id': getUserById,
    '/user/hobbies/:id': getUserHobbies,
    '/users': getUsersList
  }
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}/`);

  console.log(url.pathname); // /user/3

  const userId = url.pathname.replace('/hobbies', '').replace('/user/', '');

  if (userId !== url.pathname) {
    req.id = userId;
    url.pathname = url.pathname.includes('/hobbies/') ? '/user/hobbies/:id' : '/user/:id';
  }

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

