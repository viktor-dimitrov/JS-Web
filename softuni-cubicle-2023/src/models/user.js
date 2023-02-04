const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minLenght: 2,
        
    },

    password: {
        type: String,
        required: true,
        minLenght: 2,

    }

})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;
    console.log(hash)
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;