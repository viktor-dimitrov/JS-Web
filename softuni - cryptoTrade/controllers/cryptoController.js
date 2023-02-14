const cryptoService = require('../services/cryptoService')

exports.getCatalogPage = async (req, res) => {

    try{
        const allCrypto = await cryptoService.getAll();
        res.render('crypto/catalog', {allCrypto});
    }catch(error){
        res.redirect('/404');
    }

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

exports.getDetailsPage = async (req, res) => {
    const cryptoId = req.params._id;
    try{
        const currentCrypto = await cryptoService.getOne(cryptoId);
        const isOwner = (req.user?._id == currentCrypto.owner);
        res.render('crypto/details', {currentCrypto, isOwner});
    }catch(error){

    }
    
}

exports.getEditPage = (req, res) => {
    res.render('crypto/edit');
}

exports.getSearchPage = (req, res) => {
    res.render('crypto/search');
}