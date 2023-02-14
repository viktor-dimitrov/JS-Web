const cryptoService = require('../services/cryptoService');
const Crypto = require('../models/crypto');
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
    try{
        const currentCrypto = await cryptoService.getOne(req.params._id);
        const isOwner = (req.user?._id == currentCrypto.owner);
        const isTrader = Object.values(currentCrypto.traders).some(id => id == req.user?._id);
        res.render('crypto/details', {currentCrypto, isOwner, isTrader});
    }catch(error){
        res.redirect('/404');
    }
    
}

exports.getEditPage = async(req, res) => {
   try{
    const currentCrypto = await cryptoService.getOne(req.params._id);
    const paymentMethods = paymentMethodsMap.map((el) => (el.key == currentCrypto.payment) ? {...el, selected: true} : el );
    res.render('crypto/edit', {currentCrypto, paymentMethods});
   }catch(error){
    res.redirect('/404');
   }
}
exports.postEdit = async (req, res) => {
    const currentCrypto = req.body;
    const cryptoId = req.params._id;
    const paymentMethods = paymentMethodsMap.map((el) => (el.key == currentCrypto.payment) ? {...el, selected: true} : el );

    try{
       await cryptoService.updateCrypto(cryptoId, currentCrypto);
        res.redirect(`/details/${cryptoId}`);
    }catch(error){
        return res.status(400).render('crypto/edit', {currentCrypto, paymentMethods, error});
    }
}

exports.getDelete = async (req, res) => {
    try{
        await Crypto.findByIdAndDelete(req.params._id);
        res.redirect('/catalog');
    }catch(error){
        res.redirect('/404');
    }
}

exports.buyCrypto = async (req, res) => {
    try {
        await Crypto.findByIdAndUpdate(req.params._id, {$push: {traders: req.user._id}});
        res.redirect(`/details/${req.params._id}`);
    } catch (error) {
        res.redirect('/404');
    }

}

exports.getSearchPage = (req, res) => {
    res.render('crypto/search');
}