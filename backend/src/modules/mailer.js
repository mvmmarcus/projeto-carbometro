const express = require('express');
const { resolve } = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer'); // importando biblioteca nodemailer para configuração de recuperação de senha
const nodemailerhbs = require('nodemailer-express-handlebars'); // importando biblioteca para usar templates de e-mail.

const { host, port, auth } = require('../config/mail.json');

const transport = nodemailer.createTransport({
  host,
  port,
  auth,
});

function configureTemplates() {
  const viewPath = resolve(__dirname, '..', 'resources', 'mail'); //caminho para template

  transport.use( //estrutura para envio de email personalisados, repassando um template (como um html) informando um token para recuperação de senha.
    'compile',
    nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, ''),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'auth/forgot_password',
        extname: '.handlebars',
      }),
      viewPath,
      extName: '.handlebars',
    })
  );
}

configureTemplates();

module.exports = transport;