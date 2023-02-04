const User = require('../models/user');
const signToken = require('./tokenService');


exports.register = (username, password) => User.create({username, password});

exports.getUser = (username) => User.findOne({username});

exports.login = async (username, password) => {
    const user = await this.getUser(username);
    const passIsValid = await user.passValidation(password);
    
    if (!user || !passIsValid) {
        throw new Error( "Invalid username of password!");
     }

     const payload = {
        username: user.username,
        userId: user._id,
     }

     const token = signToken(payload);

     return token


    
}