
const bookService = require('../services/bookService');

exports.getCreatePage = (req, res) => {
    res.render('book/create')
}

exports.postCreate = async (req, res) => {
    const data = req.body;
    data.owner = req.user._id;

    try{

        await bookService.craeteBook(data);
        

    }catch(error){
        console.log(error)
    }
}