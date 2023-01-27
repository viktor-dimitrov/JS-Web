const mongoose = require('mongoose');


const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLenght: 50,
    },
    imageUrl: {
        type: String,
        required:true,
        // http/https validationa expect !!
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: {
        //TODO
    }

});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;