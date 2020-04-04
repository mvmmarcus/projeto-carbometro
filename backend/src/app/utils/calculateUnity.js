

module.exports = function getParams(glicemia, carbTotal, bolusRefeicao, fc, glicemiaAlvo) {

    const glucose = glicemia;
    const cTotal = carbTotal;
    const bRefeicao = bolusRefeicao;
    const ftC = fc;
    const gAlvo = glicemiaAlvo;

    const bolusAlimento = (cTotal / bRefeicao);

    const correcao = ((glucose - gAlvo) / ftC);
    
    const bolusTotal = (bolusAlimento + correcao);   

    return bolusTotal;
}