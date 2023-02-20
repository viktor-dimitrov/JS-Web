
const mongoose = require('mongoose');
const validators = require('mongoose-validators');

// ⦁	Start Point - string (required), 
// ⦁	End Point – string (required),
// ⦁	Date – string (required),
// ⦁	Time – string (required),
// ⦁	Car Image – string (required),
// ⦁	Car Brand – string (required),
// ⦁	Seats – number (required),
// ⦁	Price – number (required),
// ⦁	Description – string (required),
// ⦁	Creator – object Id (reference to the User model),
// ⦁	Buddies – a collection of Users (reference to the User model)


const tripSchema = new mongoose.Schema({

    start: {
        type: String,
        required: true,
        minLength: 4
    },
    end: {
        type:  String,
        required: true,
        minLength: 4
    },
    date: {
        type: String,
        required: true,
        minLength: 1
    },
    time: {
        type: String,
        required: true,
       
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
    brand: {
        type: String,
        required: true,
        minLength: 4
      
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
       
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
       
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
  
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    
    },
    buddies: [ {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }]
    
})

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;

