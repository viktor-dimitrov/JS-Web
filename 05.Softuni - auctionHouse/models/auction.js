
const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const auctionSchema = new mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type:  String,
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
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
