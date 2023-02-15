const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        // minLength:[ 4, 'Username should be at least four characters long']
    },
    author: {
        type: String,
        required: [true,'Author is required'],
    
    },
    image: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    stars:{ 
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }


});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;