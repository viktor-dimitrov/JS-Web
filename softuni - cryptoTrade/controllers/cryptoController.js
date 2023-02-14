const cryptoService = require('../services/cryptoService')
const  { paymentMethodsMap } = require('../lib/constants');

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
       
        return res.status(400).render('crypto/create', {error})
    }
   
}

exports.getDetailsPage = async (req, res) => {
    // const cryptoId = req.params._id;
    try{
        const currentCrypto = await cryptoService.getOne(req.params._id);
        const isOwner = (req.user?._id == currentCrypto.owner);
        res.render('crypto/details', {currentCrypto, isOwner});
    }catch(error){

    }
    
}

exports.getEditPage = async(req, res) => {
   try{
    const currentCrypto = await cryptoService.getOne(req.params._id);
    const paymentMethods = paymentMethodsMap.map((el) => (el.key == currentCrypto.payment) ? {...el, selected: true} : el );
    res.render('crypto/edit', {currentCrypto, paymentMethods});
   }catch(error){
    
   }
}

exports.postEdit = async (req, res) => {
    const data = req.body;
    const cryptoId = req.params._id;
    const currentCrypto = data;
    const paymentMethods = paymentMethodsMap.map((el) => (el.key == currentCrypto.payment) ? {...el, selected: true} : el );

    try{
       await cryptoService.updateCrypto(cryptoId, data);
        res.redirect(`/details/${cryptoId}`);
    }catch(error){
        return res.status(400).render('crypto/edit', {currentCrypto, paymentMethods, error})
    }
}

exports.getSearchPage = (req, res) => {
    res.render('crypto/search');
}