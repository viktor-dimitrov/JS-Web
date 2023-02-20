const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../lib/constants');
 

exports.getUser = (username) => User.findOne({username});

exports.regUser = async (data) => {
    const {username, email,  password, repassword} = data;
   
    const user = await this.getUser(username);
    
    if(user){
        throw new Error ('Username is already registered!');
    }
    if( password != repassword){
        throw new Error('The repeat password should be equal to the password!');
    }
    if(password.length < 4){
        throw new Error('The password is required and should be at least 4 characters long!')
    }

    try{
        const hashPass = await bcrypt.hash(password, 5);
        const user = await User.create({username, email, password: hashPass});
        
        const payload = {
            _id: user._id,
            username,
            email
        }
    
        const token = await jwt.sign(payload, SECRET);
    
        return token;
    }catch(error){
        console.log(error)
       throw new Error((error.message).split(':')[2].split(',')[0]);
    }
       
   
  
}

exports.logUser = async (data) => {

    const {username, password} = data;

    const user = await this.getUser(username);

    if(!user){
        throw new Error ('Invalid username or password!');
    }

     const passIsValid =  await bcrypt.compare(password, user.password);

     if(!passIsValid){
        throw new Error ('Invalid username or password!');
    }
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(payload, SECRET);

    return token;
}


