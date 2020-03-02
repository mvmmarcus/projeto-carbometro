const fs = require('fs'); //permite trabalhar com file systen do node para carregar arquivos
const path = require('path'); //nos permite trabalhar com caminhos de pastas

module.exports = app => {
    fs
        .readdirSync(__dirname) //ler o diretorio atual (diretório do index.js)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js"))) //filtra os arquivos que o nome não começam com "."(arquivos de config) e tambem não quer que seja o arquivo "index.js"
        .forEach(file => require(path.resolve(__dirname, file))(app)); //percorre todos os controllers da pasta e atribui o app para cada um deles
}