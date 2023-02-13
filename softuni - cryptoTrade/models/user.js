const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength:[ 5, 'Username should be at least five characters long']
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        minLength: [10,'Email should be at least ten characters long']
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    }

});

const User = mongoose.model('user', userSchema);

module.exports = User;
