const User = require('../models/user')

exports.regUser = (username, email, password, repassword) => {

    if( password != repassword){
        throw new Error('Password missmatch');
    }



    User.create({username, email, password, repassword});
}

