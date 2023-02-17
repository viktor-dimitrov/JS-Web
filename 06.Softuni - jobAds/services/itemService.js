const Ad = require('../models/ad');


exports.getAll = async () => await Ad.find().lean();

exports.getOne = async (auctionId) => {
try{
     return await Ad.findById(auctionId).populate('bidder').populate('author').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createItem = async (data) => {
    try{
        await Ad.create(data);
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delItem = async (itemId) => await Ad.findByIdAndDelete(itemId);

exports.editItem = async (itemId, data) => {
   
    try{
        await Ad.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateBid = async (itemId, bidAmount, userId) => {
    try{
       return await Ad.findByIdAndUpdate(itemId, {price: Number(bidAmount), bidder: userId}).lean();

    }catch(error){
        throw new Error(error.message)
    }
} 
    