const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minLenght: 5,
        unique: true,
       
        
    },

    password: {
        type: String,
        required: true,
        minLenght: 8,

    }

})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;
    next();
})

userSchema.method('passValidation', async function(password){
    return bcrypt.compare(password, this.password);
})

const User = mongoose.model('User', userSchema);

module.exports = User;