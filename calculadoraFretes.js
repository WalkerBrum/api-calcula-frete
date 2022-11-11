const fetch = require('node-fetch');

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
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
        throw customError('CEP inválido', 400)
    }

    return response.json();
}

const requestApiCorreios = async (cep) => {
    const url = bodyRequest(cep);

    const response = await fetch('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?' + new URLSearchParams(url).toString());

    const xml = await response.text();
    console.log(xml);

    return xml;
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


