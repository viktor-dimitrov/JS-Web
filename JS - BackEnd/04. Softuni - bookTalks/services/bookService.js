const Book = require('../models/book');
const User = require('../models/user')


exports.getAll = async () => await Book.find().lean();

exports.getOne = async (bookId) => await Book.findById(bookId).lean();

exports.craeteBook = async (data) => {
    try{
        await Book.create(data);
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.wishBook = async (bookId, userId) => {
    try{
        await Book.findByIdAndUpdate(bookId, {$push: {wishingList: userId}});
        await User.findByIdAndUpdate(userId, {$push: {wishes: bookId}})
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }


}




exports.editBook = async (bookId, data) => {
    try{
        await Book.findByIdAndUpdate(bookId, data, {runValidators: true} );
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0]);
    }
}

exports.delBook = async (bookId) => {

    try{
        await Book.findByIdAndDelete(bookId);
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
    
}
 
