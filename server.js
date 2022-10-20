const http = require('http');
const url = require('url');
const calculaFrete = require('./calculadoraFretes')

const port = 3000;

const server = http.createServer(async (req, res) => {
    try {
        const { pathname, query: { cep } } = url.parse(req.url, true);

        if (pathname && pathname.includes('/valorfrete')) {

            const valorFrete = await calculaFrete(cep);
        
            res.end(JSON.stringify({ 'valor frete': `${valorFrete}`}));
        } 

    } catch (error) {
        res
        .writeHead(error.status ?? 500, { 'Content-Type': 'text/html; charset=utf-8' })
        .end(JSON.stringify({ message: error.message}));   
    }
    
    return;   
 });
 
server.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}/`));

// npm install nodemon -D