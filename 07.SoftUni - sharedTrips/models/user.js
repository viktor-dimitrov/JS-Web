const mongoose = require('mongoose');
const validators = require('mongoose-validators');


// ⦁	Email - string (required),
// ⦁	Password - string (required),
// ⦁	Gender – string (male or female) required ,
// ⦁	Trips History – a collection of Trips (reference to the Trip Model)


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        minLength: [1,'Email should be at least ten characters long'],
        // validate: {
        //     validator: function (email) {
        //       const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
        //       return emailRegex.test(email);
        //     },
        //     message: 'Invalid email format'
        //   }
       
    },

    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
        maxLength: 40
    },

    trips :[ {
        type: mongoose.Types.ObjectId,
        ref: 'trip'
    }]


});

const User = mongoose.model('user', userSchema);

module.exports = User;


