const mongoose = require('mongoose');
const validators = require('mongoose-validators');




const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true,'name is required'],
        maxLength: [20,'Address should be a maximum of 20 characters long'],
        // match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Name shoude be format - (Firstname Lastname)"]
        // validate: {
        //     validator: function (email) {
        //       const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
        //       return emailRegex.test(email);
        //     },
        //     message: 'Invalid email format'
        //   }
       
    },
    username: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [4, 'The User name should be at least 4 characters long']
        // enum: {
        //     values: ['female', 'male'],
        //     message: ['Invalid gender']
        // }
    },

    password: {
        type: String,
        required: true,
        minLength: 4
    },



    publications:[ {
        type: mongoose.Types.ObjectId,
        ref: 'publication'
    }],

    shares:[ {
        type: mongoose.Types.ObjectId,
        ref: 'publication'
    }]



});

const User = mongoose.model('user', userSchema);

module.exports = User;


