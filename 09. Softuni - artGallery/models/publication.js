
const mongoose = require('mongoose');
const validators = require('mongoose-validators');


const publicationSchema = new mongoose.Schema({


//     ⦁	Title - string (required),
// ⦁	Painting technique - string (required),
// ⦁	Art picture - string (required),
// ⦁	Certificate of authenticity - string ("Yes", "No") required,
// ⦁	Author - object Id (a reference to the User model),
// ⦁	Users Shared - a collection of Users (a reference to the User model)


    title: {
        type: String,
        required: true,
        minLength: [6, 'Title should be at least 6 characters']
    },
    technique: {
        type:  String,
        required: true,
        maxLength: 15
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
    certificate: {
        type: String,
        required: true,
         enum: {
            values: ['Yes', 'No'],
            message: 'Certificate of authenticity must be "Yes" or "No"'
        }
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',

    },
    shared: [ {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }]

})

const Publication = mongoose.model('publication', publicationSchema);

module.exports = Publication;

