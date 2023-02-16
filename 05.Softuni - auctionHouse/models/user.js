const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        minLength: [1,'Email should be at least ten characters long'],
       
    },
    firstName: {
        type: String,
        required: [true, 'Username is required'],
        minLength:[ 1, 'First name should be at least one characters long'],
        
    },
    lastName: {
        type: String,
        required: [true, 'Username is required'],
        minLength:[ 1, 'Last name should be at least one characters long'],
        
    },
    password: {
        type: String,
        required: true,
    },

    closed:[ {
        type: mongoose.Types.ObjectId
    }]


});

const User = mongoose.model('user', userSchema);

module.exports = User;
