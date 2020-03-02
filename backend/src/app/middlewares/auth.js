//Middleware: processo entre a solicitação de um user de acessar uma rota e a autenticação do mesmo. Irá permiter ou não que o user acesse a determinada rota
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) //auhHeader = token de autenticação
        return response.status(401).send({ error: 'No token provided' }); //401: erro de autenticação

    // Formato do token: Bearer fhrhfh16d44dv6dv54d6416gh  

    const parts = authHeader.split(' '); // tranformando a string do token em um array com duas posições

    if (!(parts.length === 2)) // verificando se o token é valido
        return response.status(401).send({ error: 'Token Error' });
    //Bearer //token
    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))  //utilizando 'reject' para atribuir ao scheme o Bearer do token dentro do parts
        return response.status(401).send({ error: 'Token Malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return response.status(401).send({ error: 'Token invalid' });

        request.userId = decoded.id;//userId é um objeto de um usuario ja autenticado, para que possamos usar em qualquer função do controller que esteja autenticado
        return next();
    });
};

