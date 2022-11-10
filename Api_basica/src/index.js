const http = require('http');

const server = http.createServer((request, response)=>{
  response.writeHead(200,{ 'Content-Type': 'text/html' });
  response.end('<h1>Hello word!!</h1>')
});

server.listen(3000, () => console.log('Sever rodando na porta 3000'));