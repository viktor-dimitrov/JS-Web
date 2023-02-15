const User = require('../models/user');
const tokenService = require('./tokenService');


exports.register = (username, password) => User.create({username, password});

exports.getUser = (username) => User.findOne({username});

exports.login = async (username, password) => {
    const user = await this.getUser(username);
    if(!user){
      throw new Error(`User ${username}, doesn't exist!`)
    }
    const passIsValid = await user.passValidation(password);
    
    if (!user || !passIsValid) {
        throw new Error( "Invalid username or password!");
     }

     const payload = {
        username: user.username,
        userId: user._id,
     }

     const token = await tokenService.signToken(payload);
     return token
}