
const mongoose = require('mongoose');
const validators = require('mongoose-validators');

// ⦁	Name - string (required),
// ⦁	Type - string (“Apartment”, “Villa”, “House”) required,
// ⦁	Year - number (required),
// ⦁	City – string (required),
// ⦁	Home Image - string (required),
// ⦁	Property Description - string (required),
// ⦁	Available pieces - number(required)
// ⦁	Rented a home - a collection of Users (reference to the User model)
// ⦁	Owner - object Id (reference to the User model)


const houseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: [6, 'Name should be at least 6 characters']
    },
    type: {
        type:  String,
        required: true,
        minLength: 4
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: 2021
    },
    city: {
        type: String,
        required: true,
        minLength: [4, 'The City should be at least 4 characters long']
       
    },
    imageUrl: {
        type: String,
        required: true,
        validate:{
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid URL!!!'
        } 
        
    },

    description: {
        type: String,
        required: true,
        maxLength: 60
    },
 
    pieces: {
        type: Number,
        required: true,
        min: 0,
         max: 10
       
    },


  
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    
    },
    rent: [ {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }]
    
})

const House = mongoose.model('house', houseSchema);

module.exports = House;

