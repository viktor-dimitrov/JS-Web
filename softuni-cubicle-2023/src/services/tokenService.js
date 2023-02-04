const jwt = require('jsonwebtoken');
const config = require('../config');

async function signToken(payload){

    const token = new Promise ((resolve, reject) => {   
      jwt.sign(payload, config.SECRET, {expiresIn: '1h'}, (err, token) => {
        if (err){
            reject(err)
        } else {
            resolve(token);
        }
     });
    })

    return token;
}

module.exports = signToken