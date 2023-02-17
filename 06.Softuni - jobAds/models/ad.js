
const mongoose = require('mongoose');
const validators = require('mongoose-validators');


// ⦁	Headline - string (required),
// ⦁	Location - string (required),
// ⦁	Company name - string (required),
// ⦁	Company description - string (required),
// ⦁	Author - object Id (a reference to the User model),
// ⦁	Users applied - a collection of Users (a reference to the User model)


const adSchema = new mongoose.Schema({

    headline: {
        type: String,
        required: true,
        minLength: 1
    },
    location: {
        type:  String,
        required: true,
        minLength: 1
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    
    },
    applied: [ {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }]
    
})

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;


// ⦁	Title – string (required)
// ⦁	Description – string
// ⦁	Category – string (required)
// ⦁	Image URL – string
// ⦁	Price – number (required)
// ⦁	Author –reference to the User model (required)
// ⦁	Bidder – reference to the User model
