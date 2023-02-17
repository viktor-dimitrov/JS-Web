const Auction = require('../models/auction');


exports.getAll = async () => await Auction.find().lean();

exports.getOne = async (auctionId) => {
try{
     return await Auction.findById(auctionId).populate('bidder').populate('author').lean();
}catch(error){
    throw new Error(error.message)
}
}   

exports.createAuction = async (data) => {
    try{
        await Auction.create(data);
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}

exports.delAuction = async (itemId) => await Auction.findByIdAndDelete(itemId);

exports.editAuction = async (itemId, data) => {
   
    try{
        await Auction.findByIdAndUpdate(itemId, data, {runValidators: true})

    }catch(error){
       
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}


exports.updateBid = async (itemId, bidAmount, userId) => {
    try{
       return await Auction.findByIdAndUpdate(itemId, {price: Number(bidAmount), bidder: userId}).lean();

    }catch(error){
        throw new Error(error.message)
    }
} 
    