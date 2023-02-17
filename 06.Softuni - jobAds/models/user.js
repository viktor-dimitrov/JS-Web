const mongoose = require('mongoose');
const validators = require('mongoose-validators');


// ⦁	Email - string (required),
// ⦁	Password - string (required),
// ⦁	Description of skills - string (required),
// ⦁	My ads - a collection of Ads (a reference to the Ad Model)
// Note: When a user creates a new ad, a reference to that ad is added to that collection (My ads).



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        minLength: [1,'Email should be at least ten characters long'],
       
    },

    password: {
        type: String,
        required: true,
    },

    skills: {
        type: String,
        required: true,
    },

    ads:[ {
        type: mongoose.Types.ObjectId,
        ref: 'ad'
    }]


});

const User = mongoose.model('user', userSchema);

module.exports = User;


