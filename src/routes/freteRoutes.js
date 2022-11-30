const { Router } = require('express');
const { cepInfo, freteInfo, registrarProduto, buscarProdutos  } = require('../controller/logisticController')

const routes = Router();

routes.get('/endereco/cep=:cep', cepInfo);
routes.get('/frete/cep=:cep', freteInfo);
routes.get('/produtos', buscarProdutos);
routes.post('/produtos', registrarProduto);

module.exports = routes;