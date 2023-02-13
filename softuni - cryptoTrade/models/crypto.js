const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    payment: {
        type: String,
        required: [true, 'Payment method is required']
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




// ⦁	Name - String (required),
// ⦁	Image: String (required),
// ⦁	Price: Number (required),
// ⦁	Crypto Description: String (required),
// ⦁	Payment Method: String (crypto-wallet, credit-card, debit-card, paypal) required,
// ⦁	Buy a crypto - a collection of Users (a reference to the User model)
// ⦁	Owner - object Id (a reference to the User model)
// Note:  When a user buys crypto, their id is added to that collection (Buy a crypto)
// Implement the entities with the correct data types.
