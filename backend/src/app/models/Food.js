const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    measure: {
        type: String,
        required: true
    },
    unitGram: {
        type: Number,
        required: true
    },
    cho: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Food', FoodSchema);