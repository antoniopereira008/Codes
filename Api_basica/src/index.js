const http = require('http');
const {URL} = require('url');

const routes = require('./routes');

const server = http.createServer((request, response)=>{
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split('/').filter(Boolean);
  
  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  console.log(`Request Method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routes.find((routObj) => (
    routObj.endpoint === pathname && routObj.method === request.method
  ));

  if(route){
    request.query = parsedUrl.query;
    request.params = { id };

    route.handler(request,response);
  } else {
    response.writeHead(404,{'Content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${pathname}`);
  }
 
});

server.listen(3000, () => console.log('Sever rodando na porta 3000'));