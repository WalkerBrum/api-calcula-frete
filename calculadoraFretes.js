const fetch = require('node-fetch');
const axios =  require('axios');

const CEPLOJA = '13206765';
const cdServico = '41106';

const bodyRequest = (cepDestino) => {
    return {
        'nCdServico': cdServico,
        'sCepOrigem': CEPLOJA,
        'sCepDestino': cepDestino,
        'nVlPeso': "1",
        'nCdFormato': 1,
        'nVlComprimento': 20,
        'nVlAltura': 20,
        'nVlLargura': 20,
        'nVlDiametro': 0,
        'sCdMaoPropria': "N",
        'nVlValorDeclarado': 0,
        'sCdAvisoRecebimento': "N",
        'StrRetorno': "xml",
        'nIndicaCalculo': 3
    }
}

const customError = (message, status) => ({ message, status});

const consultaCEP = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.data) {
        throw customError('CEP inválido', 400)
    }

    return response.data;   
}

const requestApiCorreios = async (cep) => {
    const url = bodyRequest(cep);

    const response = await axios.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?' + new URLSearchParams(url).toString());

    return response.data;
}

const infoEndereco = async (cep) => {
    const endereco = await consultaCEP(cep);

    return endereco;
}

const prazoEntrega = async (cep) => {
    const xmlCorreios = await requestApiCorreios(cep);
    const prazoEntrega = await xmlCorreios.match(/<PrazoEntrega>(.+)<\/PrazoEntrega>/);
    console.log(prazoEntrega);

    if (prazoEntrega[1] === '0') {
        throw customError('CEP inválido', 400)
    }

    return prazoEntrega[1];
}

const valorEntrega = async (cep) => {
    const xmlCorreios = await requestApiCorreios(cep);
    const valorEntrega = await xmlCorreios.match(/<Valor>(.+)<\/Valor>/);

    if (valorEntrega[1] === '0') {
        throw customError('CEP inválido', 400)
    }

    return valorEntrega[1];
}

module.exports = { infoEndereco, prazoEntrega, valorEntrega };


