const http = require('http');
const url = require('url');
const calculaFrete = require('./calculadoraFretes')

const port = 3000;

const server = http.createServer((req, res) => {
    
    let requestUrl = url.parse(req.url, true);
 
    if (requestUrl.pathname === '/valorfrete/') {

        let requestUrlData = requestUrl.query;

        const valorFrete = calculaFrete(requestUrlData.cidade, requestUrlData.estado);
    
        return res.end(JSON.stringify({ 'valor frete': `${valorFrete}`}));
    }

    const valorFrete = calculaFrete();

    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });

    return res.end(JSON.stringify({ 'valor frete': `${valorFrete}`}));

 });
 
server.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}/`));

// npm install nodemon -D