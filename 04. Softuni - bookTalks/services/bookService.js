const Book = require('../models/book');


exports.getAll = async () => await Book.find().lean();

exports.craeteBook = async (data) => {
    try{
        await Book.create(data);
    }catch(error){
        throw new Error((error.message).split(':')[2].split(',')[0])
    }
}