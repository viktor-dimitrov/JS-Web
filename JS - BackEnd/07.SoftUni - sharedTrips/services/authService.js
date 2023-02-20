const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../lib/constants');
 

exports.getUser = (email) => User.findOne({email});

exports.regUser = async (email, gender, password, repassword) => {
   
    const user = await this.getUser(email);
    
    if(user){
        throw new Error ('Email is already registered');
    }
    if( password != repassword){
        throw new Error('The repeat password should be equal to the password');
    }
    if(password.length < 5){
        throw new Error('The password should be at least five characters long')
    }

    try{
        const hashPass = await bcrypt.hash(password, 5);
        const user = await User.create({email, gender, password: hashPass});
        
        const payload = {
            _id: user._id,
            email,
           gender,
        }
    
        const token = await jwt.sign(payload, SECRET);
    
        return token;
    }catch(error){
        console.log(error)
       throw new Error((error.message).split(':')[2].split(',')[0])
    }
       
   
  
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
        email: user.email,
        gender: user.gender
    }

    const token = await jwt.sign(payload, SECRET);

    return token;
}


