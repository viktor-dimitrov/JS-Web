const mongoose = require('mongoose');
const validators = require('mongoose-validators');




const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,'First Name is required'],
        minLength: [3, 'The User name should be at least 3 characters long'],
         match: [/^[A-Za-z]{3,}$/, "Name shoude contains only English letters"]
        // validate: {
        //     validator: function (email) {
        //       const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
        //       return emailRegex.test(email);
        //     },
        //     message: 'Invalid email format'
        //   }
       
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
         minLength: [5, 'The User name should be at least 5 characters long'],
         match: [/^[A-Za-z]{5,}$/, "Name shoude contains only English letters"]
        // enum: {
        //     values: ['female', 'male'],
        //     message: ['Invalid gender']
        // }
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
              const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
              return emailRegex.test(email);
            },
            message: 'Invalid email format'
          }
    },

    password: {
        type: String,
        required: true,
        minLength: 4
    },

    myPosts:[ {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }],



});

const User = mongoose.model('user', userSchema);

module.exports = User;


