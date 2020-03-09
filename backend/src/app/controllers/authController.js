const express = require('express');
const bcrypt = require('bcryptjs'); //para validar se a senha é correta
const jwt = require('jsonwebtoken'); //biblioteca para autenticação com token
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');

const { Router } = require('express');

const routes = Router();
const authRoutes = Router();
authRoutes.use(authMiddleware);

function generateToken(params = {}) { //função para atenticação com token (hash: utlizado da Config)
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

routes.get('/', (request, response) => {
    response.json({ homePge: "home" });
});

routes.post('/register', async (request, response) => {
    const { email } = request.body; //pegando o email que foi inserido no front pelo usuário

    try {
        if (await User.findOne({ email }))
            return response.status(400).send({ error: 'User already exists' }); //se, email já existe, retorna(response) mensagem que já existe cadastrado

        const user = await User.create(request.body); //criando usuário a partir do que foi inserido no front end pelo usuário

        user.password = undefined; //removendo senha do BD apos criação(segurança) 

        return response.json({
            user,
            token: generateToken({ id: user.id })
        });

    } catch (err) {
        return response.status(400).send({ error: 'Register invalid' });
    }

});

routes.get('/users', async (request, response) => {

    const user = await User.find()

    try {
        return response.json({ user })
    }
    catch (err) {
        console.log(err)
        return response.json({ err: "falha na busca dos usuarios cadastrados no bd" })

    }

});

routes.get('/users/:id', async (request, response) => {

    const id = request.params.id;

    const user = await User.findById(id)

    try {
        return response.json({ user })
    }
    catch (err) {
        console.log(err)
        return response.json({ err: "falha na busca dos usuarios cadastrados no bd" })

    }

});

routes.post('/login', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return response.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))  //comparando o password digitado com o armazenado no banco
        return response.status(400).send({ error: 'Invalid password' });

    user.password = undefined; // nao disponibilizando a senha para visualização

    response.json({
        user,
        token: generateToken({ id: user.id })
    });
});

routes.post('/forgot_password', async (request, response) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return response.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex'); //criando token de 20 caracteres em string hexadecimal

        const now = new Date();
        now.setHours(now.getHours() + 1); //duração de expiração token

        await User.findByIdAndUpdate(user.id, {
            '$set': {  //forma de atualizar valores/variáveis do banco. Nesse caso alterando o token de autenticação de senha
                passwordResetToken: token,
                passwordResetExpires: now,
            },
        });

        mailer.sendMail({
            to: email,
            from: 'marcus.vinicius.marques@hotmail.com',
            template: 'auth/forgot_password', //mensagem de envio de token configurada no arquivo "forgot_password.html"
            context: { token }, //variavéis que estão dentro do template
            subject: "Recuperação de senha Carb"
        }, (err) => {
            if (err) {
                return response.status(400).send({ error: 'Cannot send forgot password email' });

            }
            return response.send();
        })
    } catch (err) {
        response.status(400).send({ error: 'Error on forgot password, try again' });
    }
});

routes.post('/reset_password', async (request, response) => {
    const { email, token, newPassword } = request.body;

    try {
        //passando para o objeto "user" as informações do usuario contidas no banco
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires'); //configuração do mongoose, depois que redefinirmos a senha vamos precisar colocar um tempo de expiração novamente pro token
        // o ".select" é usado para selecionar as informações que queremos resgatar do usuario contidas no banco e fazer o q quisermos com elas
        if (!user)
            return response.status(400).send({ error: 'User not found' }); // validando se o usuario existe

        if (token !== user.passwordResetToken) // validando se o token inserido é igual ao enviado por email
            return response.status(400).send({ error: 'Invalid token' });

        const now = new Date();

        if (now > user.passwordResetExpires) // validando se o token não ta expirado
            return response.status(400).send({ error: 'Token expired, generate new one' });

        user.password = newPassword; // atualizando no banco o novo password

        await user.save(); // nao segue antes de salvar o user

        response.send();
    }
    catch (err) {
        response.status(400).send({ error: " Cannot reset password, try again " });
    }
});

/* 
 blood_glucose: [{
        value: {
            type: Number, // post
            required: true
        },
        createdAt: { // post
            type: Date,
            default: Date.now
        },
        updatedAt: { // metodo put
            type: Date,
            default: Date.now
        }
*/

authRoutes.post('/insert_glucose/:id', async (request, response) => {

    const id = request.params.id;
    const { value } = request.body;

    try {

        const user = await User.findByIdAndUpdate(id, {

            $push: {
                blood_glucose: [{ value }]
            }
        })

        const { blood_glucose } = await User.findById(id);

        return response.json(blood_glucose)

    }
    catch (err) {
        console.log(err)
        return response.json({ err: "erro na adição de insulina" })
    }

});

routes.get('/get_glucose/:id', async (request, response) => {

    const id = request.params.id;

    try {

        const user = await User.findById(id)

        return response.json(user.blood_glucose)
    }
    catch (err) {
        console.log(err)
        return response.json({ err: "Erro na exibição das glicemias" })
    }


});

authRoutes.delete('/delete_glucose/:id/:glucoseId', async (request, response) => {

    const id = request.params.id;
    const glucoseId = request.params.glucoseId

    try {

        const user = await User.findByIdAndUpdate(id,

            { $pull: { "blood_glucose": { _id: glucoseId } } },
            { multi: true }
        )

        return response.json(user.blood_glucose)

    }

    catch (err) {
        console.log(err)
        return response.json({ err: "Erro ao remover uma glicemia" })
    }

})

authRoutes.put('/update_glucose/:id/:glucoseId', async (request, response) => {

    const id = request.params.id;
    const glucoseId = request.params.glucoseId

    const { valor } = request.body

    try {

        const now = new Date().toLocaleString('pt-BR', {
            timeZone: "America/Sao_Paulo"
        });
        console.log(now)

        const user = await User.updateOne(
            { _id: id, "blood_glucose._id": glucoseId },
            { $set: { "blood_glucose.$.value": valor, "blood_glucose.$.updatedAt": now } }
        )

        console.log(valor)
        console.log(glucoseId)

        const { blood_glucose } = await User.findById(id);

        return response.json(blood_glucose);

    }

    catch (err) {
        console.log(err)
        return response.json({ err: "Erro ao atualizar glicemia" })
    }

})

module.exports = app => { app.use('/auth', authRoutes), app.use('/', routes) }

//module.exports = app => app.use('/', routes);