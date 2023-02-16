const Auction = require('../models/auction');


exports.getAll = async () => Auction.find().lean();

exports.getOne = async (auctionId) => Auction.findById(auctionId).lean();

exports.createAuction = async (data) => {
    try{
        await Auction.create(data);
    }catch(error){
        console.log(error)
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}
    