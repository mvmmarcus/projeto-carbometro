const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, //caixa baixa
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false //para oculta senha no banco de dados
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    createdAt: { // data de criação do usuario 
        type: Date,
        default: Date.now // pega a data de criação
    },
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
        }
    }],
    unity: [{ 
        value: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    corect_factor: Number, //100
    value_lantus: Number, //fixo
    value_breakfast: Number, //fixo
    valeu_lunch: Number, //fixo
    value_afternoon: Number, //fixo
    value_dinner: Number, //fixo
    avatar_url: String,
    phone: Number,
    born: Date,
    weight: Number,
    height: Number
});

UserSchema.pre('save', async function(next) { //realizar ação antes de salvar usuário
    const hash = await bcrypt.hash(this.password, 10); //padrão para encriptar password
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema); //exportação padrão