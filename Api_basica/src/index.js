const http = require('http');
const url = require('url');

const bodyParser = require('./helpers/bodyParse');
const routes = require('./routes');

const server = http.createServer((request, response)=>{
  const parsedUrl = url.parse(request.url, true);
  console.log(`Request mothod: ${request.method} | EndPont: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split('/').filter(Boolean);
  
  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  const route = routes.find((routObj) => (
    routObj.endpoint === pathname && routObj.method === request.method
  ));

  if(route){
    request.query = parsedUrl.query;
    request.params = { id };

    response.send = (statuscode, body) => {
      response.writeHead(statuscode, { 'Content-Type' : 'application/json' });
      response.end(JSON.stringify(body));
    }
    
    if (['PUT','POST','PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }

  } else {
    response.writeHead(404,{'Content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${pathname}`);
  }
 
});

server.listen(3000, () => console.log('Sever rodando na porta 3000'));