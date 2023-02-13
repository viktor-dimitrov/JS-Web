const Crypto = require('../models/crypto');

exports.createCrypto = async(data) => {

    console.log(data)

    try{
        await Crypto.create(data)
    }catch(error){
        console.log(error);
        // throw new Error((error.message).split(':')[2].split(',')[0])
    }

   
}