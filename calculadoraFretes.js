const fetch = require('node-fetch');

const fretePorEstado = {
    SP: 5.0,
    RJ: 6.5,
    MG: 7.2,
    PR: 8.0,
    AM: 23.5,
    AC: 23.5,
    RO: 22.0,
    RR: 22.0,
    RS: 10.0,
    SC: 10.0,
    ES: 8.0,
    MT: 11.5,
    MS: 11.5,
    GO: 11.5,
    DF: 11.5,
    BA: 15.0,
    AL: 15.0,
    CE: 15.0,
    MA: 15.0,
    PE: 15.0,
    PI: 15.0,
    SE: 15.0,
    RN: 15.0,
    PB: 15.0,
    TO: 20.0,
    PA: 20.0,
    AP: 20.0
}

const customError = (message, status) => ({ message, status});

const calculaFrete = async (cep) => {
        const { localidade, uf } = await consultaCEP(cep);

        if (localidade== 'São Paulo') {
            return 0;
        }

        return fretePorEstado[uf];
}

const consultaCEP = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
        throw customError('CEP inválido', 400)
    }

    return response.json();
}

module.exports = calculaFrete;
