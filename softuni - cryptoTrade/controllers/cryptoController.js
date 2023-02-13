const cryptoService = require('../services/cryptoService')

exports.getCatalogPage = async (req, res) => {
    const allCrypto = await cryptoService.getAll();
    console.log(allCrypto)
    res.render('crypto/catalog', {allCrypto});
}

exports.getCreatePage = (req, res) => {
    res.render('crypto/create');
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.owner = req.user['_id'];

    try{
        await cryptoService.createCrypto(data);
        res.redirect('/catalog');
    }catch(error){
        console.log(error)
        return res.status(400).render('crypto/create', {error})
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