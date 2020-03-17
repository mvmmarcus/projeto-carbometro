
const CSVToJSON = require('csvtojson');

const tabela = [];

module.exports = getFoods = function() {
    return new Promise(function (resolve, reject){

        CSVToJSON().fromFile('./alimentos.csv').then(base => {
            base.map(item => {
                tabela.push(item)
            })
            if (tabela.length > 0) {
                resolve(tabela);
            } else {
                reject(console.log("deu ruim!"))
            }
        })

    })
}

