
const bookService = require('../services/bookService');


exports.getCatalogPage = async (req, res) => {
    const allBooks = await bookService.getAll();
    res.render('book/catalog', {allBooks})
}

exports.getDetailsPage = async (req, res) => {

    try{
        const currentBook = await bookService.getOne(req.params._id);

      
    
        const isOwner = (currentBook.owner == req.user?._id) ? true : false;
    
        const isWished = (currentBook.wishingList.some(id => id == req.user?._id))
        
        res.render('book/details', {currentBook, isOwner, isWished});
    }catch(error){
        console.log(error);
    }

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

exports.getEditPage = async (req, res) => {

    try{
        const currentBook = await bookService.getOne(req.params._id);
        res.render('book/edit', {currentBook});
    }catch(error){
        console.log(error);
        res.redirect('/404');
    }
}

exports.postEdit = async(req, res) => {
    const data = req.body;
    const bookId = req.params._id;
    try{
        await bookService.editBook(bookId, data);
        res.redirect(`/details/${bookId}`);
    }catch(error){
        console.log(error);
        return res.status(400).render('book/edit', {currentBook: data, error});
    }
}

exports.getDelete = async(req, res) => {
    console.log(req.params._id)

    try{
        await bookService.delBook(req.params._id);
        res.redirect('/catalog');
    }catch(error){
        console.log(error); 
        return res.status(400).render('home/404');
    }

}

exports.getWish = async (req, res) => {
    const bookId = req.params._id;
    const userId = req.user._id;
    try{
        await bookService.wishBook(bookId, userId);
        res.redirect(`/details/${bookId}`)
    }catch(error){
        console.log(error);
        res.redirect('/404');
    }
}

