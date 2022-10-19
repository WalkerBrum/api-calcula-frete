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

const calculaFrete = (cidade, estado) => {

    try {

        const cidadeComparada = cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '').toLowerCase();
        const estadoComparado = estado.toUpperCase();

        if (cidadeComparada == 'saopaulo') {

            const valorFrete = 0;

            return valorFrete
        }

        const valorFrete = fretePorEstado[estadoComparado];

        return valorFrete;
    }

    catch (e) {

        return `Rota inválida!`;
    }     
}

module.exports = calculaFrete;
