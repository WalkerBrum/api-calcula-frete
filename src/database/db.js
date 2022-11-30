const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/produtosApiCalculaFrete';

mongoose.connect(url, {}, (error) => {
    if (error) {
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }

    console.log('Conexão com mongodb estável');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;


