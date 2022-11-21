const users = require('../mocks/users');

module.exports = {
  listUsers(request,response) {
    const { order } = request.query;
    console.log(order);
    response.writeHead(200,{ 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  },

  getUserById(response,request) {
    //const { id } = request.params;
    response.writeHead(200,{ 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ ok: true }));
  }
};