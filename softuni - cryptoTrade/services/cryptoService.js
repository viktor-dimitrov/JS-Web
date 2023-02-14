const Crypto = require('../models/crypto');

exports.getAll = async () => await Crypto.find().lean();

exports.getOne = async (id) => await Crypto.findById(id).lean();

exports.createCrypto = async(data) => {
    try{
        await Crypto.create(data)
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}

exports.updateCrypto = async (cryptoId, data) => {
    try{
        await Crypto.findByIdAndUpdate(cryptoId, data, {runValidators: true});
    }catch(error){
        console.log(error);
         throw new Error((error.message).split(':')[2].split(',')[0])
    }
}

exports.searchCrypto = async (text, payment) => {
    const expressions = [];
      
    if(text) {
        expressions.push({'name': {$regex: `${text}`, $options: 'i'}});
    }
    if(payment){
        expressions.push({'payment': {$eq: `${payment}`}})
    }

    return Crypto.find({$and: expressions}).lean();

}