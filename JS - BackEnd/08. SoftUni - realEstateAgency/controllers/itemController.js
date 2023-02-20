
const itemService = require('../services/itemService');
const authService = require('../services/authService')


exports.getCreatePage = (req, res) => {
    res.render('item/create');
}


exports.postCreate = async (req, res) => {
    const data = req.body;
    data.author = req.user._id;
   
    
    try{
        await itemService.createItem(data);
        res.redirect('/catalog');
    }catch(error){
        console.log(error);
        return res.status(400).render('item/create', {data, error})
    }
}


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
        const item =  await itemService.getOne(req.params._id);

   
         const isAuthor = item.author._id.toString() == req.user?._id;

         const rentedStrings = item.rent.map(el => el._id.toString());
         const isRented = rentedStrings.some(id => id == req.user?._id);
         const hasPieces = item.pieces > 0;

         const rentList = item.rent.map(el => el = el.name).join(', ')
         console.log(rentList)
        
        res.render('item/details', {item, isAuthor, isRented, hasPieces, rentList});
   
    }catch(error){
        console.log(error)
        res.redirect('/404')
      }

}





exports.getEditPage = async (req, res ) => {
    try{
        const item = await itemService.getOne(req.params._id);

        console.log(item)

        res.render('item/edit', {item})
    }catch(error){
        console.log(error);
        res.status(400).render('home/404')
    }


    
}
exports.postEdit = async (req, res) => {
    const data = req.body;
       try{
            await itemService.editItem(req.params._id, data);
            res.redirect(`/details/${req.params._id}`);
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

exports.getSearchPage =(req, res) => {
    res.render('item/search1');
}

exports.postSearch = async(req, res) => {
const {text} = req.body
 
try{
const result  = await itemService.searchItems(text);
 console.log(result)
res.render('item/search', {result, text});

}catch(error){
res.redirect('/404');
}

}







exports.postRent = async (req, res) => {
    const itemId = req.params._id;
    const userId = req.user._id;

    try{ 
         let item = await itemService.getOne(itemId);
       
         const pieces = item.pieces - 1;
       
         await itemService.updateHouse(itemId, userId, pieces);
                  res.redirect(`/details/${itemId}`);
            }catch(error){
                console.log(error);
                res.redirect('/404');    
            }

}  