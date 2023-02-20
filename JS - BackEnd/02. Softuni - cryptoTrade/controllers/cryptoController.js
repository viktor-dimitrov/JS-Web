const cryptoService = require('../services/cryptoService');
const Crypto = require('../models/crypto');
const payService = require('../services/payService')
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
       
        return res.status(400).render('crypto/create', {data, error})
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
    const paymentMethods = payService.payMethods(currentCrypto);
    if(currentCrypto.owner != req.user?._id) {
        res.redirect('/404')
    }

    res.render('crypto/edit', {currentCrypto, paymentMethods});
   }catch(error){
    console.log(error)
    res.redirect('/404');
   }
}
exports.postEdit = async (req, res) => {
    const currentCrypto = req.body;
    const cryptoId = req.params._id;
    const paymentMethods =  payService.payMethods(currentCrypto);

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
        console.log(error)
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

exports.getSearchPage = async (req, res) => {
    const {text, payment} = req.query
    
    try{
        const allCrypto = await cryptoService.searchCrypto(text, payment);
        res.render('crypto/search', {allCrypto, text, payment});
    }catch(error){
        res.redirect('/404');
    }

}