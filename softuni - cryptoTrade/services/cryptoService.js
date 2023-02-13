const Crypto = require('../models/crypto');

exports.getAll = async () => await Crypto.find().lean();

exports.createCrypto = async(data) => {

    try{
        await Crypto.create(data)
    }catch(error){
        console.log(error);
         throw new Error((error.message).split(':')[2].split(',')[0])
    }
}

