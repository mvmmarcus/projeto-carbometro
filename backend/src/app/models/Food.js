const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    gram: {
        type: Number,
        required: true
    },
    carb_per_gram: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Food', FoodSchema);