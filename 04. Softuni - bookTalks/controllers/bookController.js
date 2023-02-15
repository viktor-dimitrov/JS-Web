
const bookService = require('../services/bookService');


exports.getAll = async (req, res) => {
    const allBooks = await bookService.getAll();
    res.render('book/catalog', {allBooks})
}

exports.getOne = async (req, res) => {
    const currentBook = await bookService(req.params._id)
}

exports.getCreatePage = (req, res) => {
    res.render('book/create')
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.owner = req.user._id;

    try{

        await bookService.craeteBook(data);
//TODO: redirect to catalog page 
        res.redirect('/')
        
    }catch(error){
        console.log(error);
        return res.status(400).render('book/create', {error});
    }
}