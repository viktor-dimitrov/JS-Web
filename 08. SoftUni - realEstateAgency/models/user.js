const mongoose = require('mongoose');
const validators = require('mongoose-validators');




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is required'],
        minLength: [2,'Email should be at least ten characters long'],
        match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Name shoude be format - (Firstname Lastname)"]
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
        minLength: [5, 'The User name, should be at least five characters long']
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



    // trips :[ {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'trip'
    // }]


});

const User = mongoose.model('user', userSchema);

module.exports = User;


