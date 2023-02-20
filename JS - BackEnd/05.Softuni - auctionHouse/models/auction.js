
const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const auctionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLenght: 4
    },
    description: {
        type:  String,
        required: true,
        minLenght: 200
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bidder:  {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
    
})

const Auction = mongoose.model('auction', auctionSchema);

module.exports = Auction;


// ⦁	Title – string (required)
// ⦁	Description – string
// ⦁	Category – string (required)
// ⦁	Image URL – string
// ⦁	Price – number (required)
// ⦁	Author –reference to the User model (required)
// ⦁	Bidder – reference to the User model
