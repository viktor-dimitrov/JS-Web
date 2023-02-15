const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength:[ 2, 'Title should be at least two characters long']
    },
    author: {
        type: String,
        required: [true,'Author is required'],
        minLength:[ 5, 'Author should be at least five characters long']
    
    },
    image: {
        type: String,
        required:[ true, 'Image URL is required'],
        validate:{
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid Image URL'
        }
    },
    review: {
        type: String,
        required: true,
        minLength:[ 10, 'Genre should be at least ten characters long']
    },
    genre: {
        type: String,
        minLength:[ 3, 'Genre should be at least three characters long']
    },
    stars:{ 
        type: Number,
        required: [true, 'Stars is required'],
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