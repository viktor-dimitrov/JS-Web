const Crypto = require('../models/crypto');

exports.getAll = async () => await Crypto.find().lean();

exports.getOne = async (id) => await Crypto.findById(id).lean();

exports.createCrypto = async(data) => {
    try{
        await Crypto.create(data)
    }catch(error){
        console.log(error);
         throw new Error((error.message).split(':')[2].split(',')[0])
    }
}

exports.updateCrypto = async (cryptoId, data) => await Crypto.findByIdAndUpdate(cryptoId, data);

