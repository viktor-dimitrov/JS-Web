
const mongoose = require('mongoose');
const validators = require('mongoose-validators');


const postSchema = new mongoose.Schema({

    
    name: {
        type: String,
        required: [true, 'The name is required!'],
        minLength: [2, 'The name should be at least 2 characters long!']
    },

    imageUrl: {
        type: String,
        required: [true, 'The image URL is required!'],
        validate:{
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Invalid URL!'
        }

    },
    age: {
        type: Number,
        required: [true, 'The age is required and should be at least 1'],
        maxLength: [100, 'Impossible Age!'],
        min: [1, 'The age should be at least 1!'],
        max: [100, 'Max age is 100!']
    },
    description: {
        type: String,
        required: [true, 'The description is required!'],
        minLength: [8, 'The description should be at least 5 characters!'],
        maxLength: [50, 'The description should be no longer than 50 characters!']
    },
    location: {
        type: String,
        required: [true, 'The location is required!'],
        minLength: [5, 'The location should be at least 5 characters!'],
        maxLength: [50, 'The location should be no longer than 50 characters!']

        }
    ,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',

    },
    comments: [ {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        comment: {
            type: String
        },
        username: {
            type: String
        }
       
    }],
    authorName: {
        type: String
    }


})

const Post = mongoose.model('post', postSchema);

module.exports = Post;

