const Book = require('../models/book');


exports.getAll = async () => await Book.find().lean();

exports.getOne = async (bookId) => await Book.findById(bookId).lean();

exports.craeteBook = async (data) => {
    try{
        await Book.create(data);
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}