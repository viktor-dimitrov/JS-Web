
const mongoose = require('mongoose');
const validators = require('mongoose-validators');


const postSchema = new mongoose.Schema({


    // ⦁	Title - string (required),
    // ⦁	Keyword - string (required),
    // ⦁	Location - string (required),
    // ⦁	Date of creation - string (required),
    // ⦁	Image - string (required),
    // ⦁	Description - string (required),
    // ⦁	Author - object Id (a reference to the User model),
    // ⦁	Votes on post - a collection of Users (a reference to the User model),
    // ⦁	Rating of post - number, default value 0
    
    title: {
        type: String,
        required: true,
         minLength: [6, 'Title should be at least 6 characters']
    },
    keyword: {
        type:  String,
        required: true,
        minLength: [6, 'Title should be at least 6 characters']
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
    location: {
        type: String,
        required: true,
        maxLength: 15
        //  enum: {
        //     values: ['Yes', 'No'],
        //     message: 'Certificate of authenticity must be "Yes" or "No"'
        }
    ,
    date: {
        type:  String,
        required: true,
        match: /^\d{2}\.\d{2}\.\d{4}$/
    },
    description: {
        type: String,
        required: true,
        minLength: 8
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',

    },
    votes: [ {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    rating: {
        type: Number,
        
    },
    authorName: {
        type: String
    }

})

const Post = mongoose.model('post', postSchema);

module.exports = Post;

