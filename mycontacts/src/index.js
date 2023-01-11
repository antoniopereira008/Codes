const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('API de meus contatos - versao 1.0.0');
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
