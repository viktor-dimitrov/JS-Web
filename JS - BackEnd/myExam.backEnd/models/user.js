const mongoose = require('mongoose');
const validators = require('mongoose-validators');




const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'The username is required!'],
        minLength: [2, 'The username should be at least 2 characters long!']

    },
 

    email: {
        type: String,
        required: [true,'The email is required!'],
        minLength: [10, 'The email should be at least 10 characters long!']

    },

    password: {
        type: String,
        required: true,
        
    },

    myPosts:[ {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }],

});

const User = mongoose.model('user', userSchema);

module.exports = User;


