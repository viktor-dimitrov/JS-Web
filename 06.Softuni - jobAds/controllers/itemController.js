
const itemService = require('../services/itemService');


exports.getCatalogPage = async (req, res) => {
    try{
        const items = await itemService.getAll();
        res.render('item/catalog', {items});
    }catch(error){
        console.log(error);
        res.redirect('home/404');
    }
   
}


exports.getDetailsPage = async (req, res) => {
  
    try {
        const currentItem =  await itemService.getOne(req.params._id);
        const isBidder = (currentItem.bidder?._id.toString() == req.user?._id);
        const authorId = currentItem.author._id.toString()

    if (authorId == req.user?._id){
        res.render('item/detailsowner', {currentItem, authorId});
    } else {
        res.render('item/details', {currentItem, isBidder});
    }
    }catch(error){
        console.log(error)
        res.redirect('/404')
      }

}


exports.getCreatePage = (req, res) => {
    res.render('item/create');
}
exports.postCreate = async (req, res) => {
    const data = req.body;
    data.author = req.user._id;
    data.bidder = null;

    try{
        await itemService.createItem(data);
        res.redirect('/catalog');
    }catch(error){
        console.log(error);
        return res.status(400).render('item/create', {data, error})
    }
}


exports.getEditPage = async (req, res ) => {
    try{
        const currentItem = await itemService.getOne(req.params._id);

        res.render('item/edit', {currentItem})
    }catch(error){
        console.log(error);
        res.status(400).render('home/404')
    }


    
}
exports.postEdit = async (req, res) => {
    const data = req.body;
       try{
            await itemService.editItem(req.params._id, data);
            res.redirect(`/details/${req.params._id}`)
       }catch(error){
            console.log(error);
            return res.status(400).render('item/edit', {data, error})

       }
}

exports.getDelete = async (req, res) => {
    try{
            await itemService.delItem(req.params._id);
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
        let currentItem = await itemService.getOne(itemId);
        if (currentItem.price < Number(bidAmount)){
            
            try{
                  currentItem = await itemService.updateBid(itemId, bidAmount, userId);
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