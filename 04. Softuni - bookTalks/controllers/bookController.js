
const bookService = require('../services/bookService');


exports.getCatalogPage = async (req, res) => {
    const allBooks = await bookService.getAll();
    res.render('book/catalog', {allBooks})
}

exports.getDetailsPage = async (req, res) => {
    const currentBook = await bookService.getOne(req.params._id);
    const isOwner = (currentBook.owner == req.user?._id) ? true : false;
    res.render('book/details', {currentBook, isOwner});
}

exports.getCreatePage = (req, res) => {
    res.render('book/create')
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.owner = req.user._id;

    try{
        await bookService.craeteBook(data);
        res.redirect('/catalog')
    }catch(error){
        console.log(error);
        return res.status(400).render('book/create', {error});
    }
}