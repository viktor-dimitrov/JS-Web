
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
        const appliedStrings = item.applied.map(el => el._id.toString());
        const isApplied = appliedStrings.some(id => id == req.user?._id);
    
        console.log(item.applied)
        res.render('item/details', {item, isAuthor, isApplied});
   

    }catch(error){
        console.log(error)
        res.redirect('/404')
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







exports.postApply = async (req, res) => {
    const itemId = req.params._id;
    const userId = req.user._id;

    try{ 
        let item = await itemService.getOne(itemId);

         await itemService.updateApplied(itemId, userId);
                  res.redirect(`/details/${itemId}`);
            }catch(error){
                console.log(error);
                res.redirect('/404');    
            }

}  