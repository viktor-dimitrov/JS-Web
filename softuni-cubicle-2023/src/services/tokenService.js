const jwt = require('jsonwebtoken');
const config = require('../config');

  exports.signToken = (payload) => {
    console.log(`000000000000000000000${payload}`)
   return new Promise ((resolve, reject) => {   
      jwt.sign(payload, config.SECRET, {expiresIn: '1h'}, (err, token) => {
        if (err){
            reject(err)
        } else {
            resolve(token);
        }
     });
    })

    // return token;
}

 exports.verifyToken = (rawToken) => {

    return new Promise((resolve, reject) => {
        jwt.verify(rawToken, config.SECRET, (err, decoded) => {
            if(err){
                return reject(err)
            }
                return resolve(decoded)
        })
    })



 }
