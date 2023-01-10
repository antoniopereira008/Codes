const users = require('../mocks/users');

module.exports = {
  listUsers(request,response) {

    response.writeHead(200,{ 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  },

  getUserById(request,response) {
    const { id } = request.params;
    response.writeHead(200,{ 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ id }));
  },

  deleteUser(request,response) {
    let {id} = request.params;
    id = Number(id);

    users = users.filter((user) => user.id !== id);
    response.send(200, {deleted: true});
  },

  createUser(request,response) {
    const {body} = request;

    const lastUserId = users[users.length =1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    }

    users.push(newUser);
    response.send(200, newUser);
  }
};