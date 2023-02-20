const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
        },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    }

})

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;