const cryptoService = require('../services/cryptoService')

exports.getCatalogPage = (req, res) => {
    res.render('crypto/catalog');
}

exports.getCreatePage = (req, res) => {
    res.render('crypto/create');
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.owner = req.user['_id'];

    try{
        await cryptoService.createCrypto(data);
    }catch(error){
        console.log(error)
    }
   
}

exports.getDetailsPage = (req, res) => {
    res.render('crypto/details');
}

exports.getEditPage = (req, res) => {
    res.render('crypto/edit');
}

exports.getSearchPage = (req, res) => {
    res.render('crypto/search');
}