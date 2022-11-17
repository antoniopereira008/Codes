const http = require('http');
const { type } = require('os');
const routes = require('./routes');

const server = http.createServer((request, response)=>{

  console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find((routObj) => (
    routObj.endpoint === request.url && routObj.method === request.method
  ));

  if(route){
    route.handler(request,response);
  } else {
    response.writeHead(404,{'Content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
 
});

server.listen(3000, () => console.log('Sever rodando na porta 3000'));