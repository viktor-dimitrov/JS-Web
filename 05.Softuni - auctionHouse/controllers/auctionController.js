
const auctionService = require('../services/auctionService');


exports.getCatalogPage = async (req, res) => {

    try{
        const items = await auctionService.getAll();
        res.render('auction/catalog', {items});
    }catch(error){
        console.log(error);
        res.redirect('home/404');
    }

    res.render('auction/catalog')

}






exports.getCreatePage = (req, res) => {
    res.render('auction/create');
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.author = req.user._id;
    try{
        await auctionService.createAuction(data);
        //TODO: redirect to catalog 
        res.redirect('/');
    }catch(error){
        console.log(error);
        return res.status(400).render('auth/register', {error})
    }
}