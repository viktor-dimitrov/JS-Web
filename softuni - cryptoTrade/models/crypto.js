const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'The Name should be at least two characters']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate:{
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid Image URL'
        },
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'The Price should be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'The Description should be a minimum of 10 characters long']
    },
    payment: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: ['Invalid payment method']
        }
        
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    traders: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;




// ⦁	Name - String (required),
// ⦁	Image: String (required),
// ⦁	Price: Number (required),
// ⦁	Crypto Description: String (required),
// ⦁	Payment Method: String (crypto-wallet, credit-card, debit-card, paypal) required,
// ⦁	Buy a crypto - a collection of Users (a reference to the User model)
// ⦁	Owner - object Id (a reference to the User model)
// Note:  When a user buys crypto, their id is added to that collection (Buy a crypto)
// Implement the entities with the correct data types.
