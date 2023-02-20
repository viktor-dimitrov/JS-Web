const mongoose = require('mongoose');


const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid URL!!!'
        }
    },
    description: {
        type: String,
        required: true,
        maxLenght: 50,
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        rel: 'Cube',
    }]
    
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;