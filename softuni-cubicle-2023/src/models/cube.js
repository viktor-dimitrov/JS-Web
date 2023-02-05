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
        validate:{
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid URL!!!'
        },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }


})


const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube