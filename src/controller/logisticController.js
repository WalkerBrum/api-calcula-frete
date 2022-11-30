const { prazoEntrega, valorEntrega, infoEndereco, consultaCEP } = require('../services/correiosServices');
const ProductModel = require('../models/product');


const cepInfo = async (req, res) => {
    try {
        const cep = req.params.cep;
        const endereco = await infoEndereco(cep);

        res.end(JSON.stringify({ endereco }));

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const freteInfo = async (req, res) => {
    try {
        const cep = req.params.cep;

        const prazo = await prazoEntrega(cep);
        const frete = await valorEntrega(cep);

        res.end(JSON.stringify({ 'prazo entrega': `${prazo}`, 'valor frete': `${frete}` }));

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const registrarProduto = async (req, res) => {
    try {
        const { sCepOrigem, produto } = req.body;

        if (sCepOrigem.length > 8) {
            return res.json({
                message: 'CEP de origem inválido!'
            });
        }

        const endereco = await consultaCEP(sCepOrigem);

        if (endereco.erro === true) {
            return res.json({
                message: 'CEP de origem inválido!'
            });
        }

        req.body.produto = produto.toLowerCase();

        const existeProduto = await ProductModel.findOne({produto});

        if (existeProduto) {
            return res.json({
                message: `O Produto ${produto} já foi cadastrado!`
            });
        }
        
        const novoProduto = await ProductModel.create(req.body);

        res.json({
            novoProduto ,
            message: 'Produto registrado com sucesso.',
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const buscarProdutos = async (req, res) => {
    try {
        const produtos = await ProductModel.find({});

        if (!produtos) {
            return res.json({
                message: 'Nenhum produto cadastrado!'
            });
        }

        return res.json({
            produtos,
            message: 'Produtos encontrados com sucesso.'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { cepInfo, freteInfo, registrarProduto, buscarProdutos };