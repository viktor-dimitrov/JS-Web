const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../lib/constants');


exports.getUser = (email) => User.findOne({email});

exports.regUser = async (username, email, password, repassword) => {
    const user = await this.getUser(email);
    
    if(user){
        throw new Error ('Email is already registered');
    }
    if( password != repassword){
        throw new Error('The repeat password should be equal to the password');
    }
    if(password.length < 4){
        throw new Error('The password should be at least four characters long')
    }

    const hashPass = await bcrypt.hash(password, 5);
    User.create({username, email, password: hashPass});
}

exports.logUser = async (email, password) => {
    const user = await this.getUser(email);

    if(!user){
        throw new Error ('Invalid email or password!');
    }

     const passIsValid =  await bcrypt.compare(password, user.password);

     if(!passIsValid){
        throw new Error ('Invalid email or password!');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username
    }

    const token = await jwt.sign(payload, SECRET);

    return token;
}


