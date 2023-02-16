
const auctionService = require('../services/auctionService');


exports.getCatalogPage = async (req, res) => {
    try{
        const items = await auctionService.getAll();
        res.render('auction/catalog', {items});
    }catch(error){
        console.log(error);
        res.redirect('home/404');
    }
   
}


exports.getDetailsPage = async (req, res) => {
  
    try {
        const currentItem =  await auctionService.getOne(req.params._id);
        const isBidder = (currentItem.bidder?._id.toString() == req.user?._id);
        const authorId = currentItem.author._id.toString()

    if (authorId == req.user?._id){
        res.render('auction/detailsowner', {currentItem, authorId});
    } else {
        res.render('auction/details', {currentItem, isBidder});
    }
    }catch(error){
        console.log(error)
        res.redirect('/404')
      }

}



exports.getCreatePage = (req, res) => {
    res.render('auction/create');
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.author = req.user._id;
    data.bidder = null;

    try{
        await auctionService.createAuction(data);
        res.redirect('/catalog');
    }catch(error){
        console.log(error);
        return res.status(400).render('auth/register', {error})
    }
}


exports.getEditPage = async (req, res ) => {
    try{
        const currentItem = await auctionService.getOne(req.params._id);

        res.render('auction/edit', {currentItem})
    }catch(error){
        console.log(error);
        res.status(400).render('home/404')
    }


    res.render('auction/edit')
}
exports.postEdit = async (req, res) => {
       
}


exports.getDelete = async (req, res) => {
    try{
            await auctionService.delAuction(req.params._id);
            res.redirect('/catalog')
    }catch(error){
        console.log(error);
        res.redirect('home/404')
    }
}







exports.postBid = async (req, res) => {
    const bidAmount = req.body.bidAmount;
    const itemId = req.params._id;
    const userId = req.user._id;

    try{
        let currentItem = await auctionService.getOne(itemId);
        if (currentItem.price < Number(bidAmount)){
            
            try{
                  currentItem = await auctionService.updateBid(itemId, bidAmount, userId);
                  res.redirect(`/details/${itemId}`);
            }catch(error){
                console.log(error);
                res.redirect('/404');    
            }


        } else {
            res.redirect(`/details/${itemId}`);
        }
    }catch(error){
        console.log(error);
        res.redirect('/404')
    }
   
}  