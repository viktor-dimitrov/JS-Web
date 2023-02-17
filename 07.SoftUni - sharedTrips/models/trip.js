
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
        minLength: 1
    },
    end: {
        type:  String,
        required: true,
        minLength: 1
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
        
    },
    brand: {
        type: String,
        required: true,
      
    },
    seats: {
        type: Number,
        required: true,
       
    },
    price: {
        type: Number,
        required: true,
       
    },
    description: {
        type: String,
        required: true,
        maxLength: 40
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

