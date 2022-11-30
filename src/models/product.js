const mongoose = require('../database/db');

const ProductSchema = new mongoose.Schema({
    sCepOrigem: {
        type: String,
        required: true,
    },
    produto: {
        type: String,
        required: true,
    },
    infoCaixa: {
        nV1Peso: {
            type: String,
            required: true,
        },
        nV1Comprimento: {
            type: Number,
            required: true,
        },
        nV1Altura: {
            type: Number,
            required: true,
        },
        nV1Largura: {
            type: Number,
            required: true,
        },
        nV1Diametro: {
            type: Number,
            required: true,
        }
    }
}, { 
    collection: 'produtosApiCalculaFrete',
    versionKey: false 
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;