const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true,
        validate:  validators.isAlphanumeric({message:'Username should consist only of English letters and digits'}),
       
        
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: validators.isAlphanumeric({message:'Username should consist only of English letters and digits'}),

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