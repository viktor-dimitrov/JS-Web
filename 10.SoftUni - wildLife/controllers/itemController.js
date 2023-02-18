
const itemService = require('../services/itemService');
const authService = require('../services/authService')


exports.getCreatePage = (req, res) => {
    res.render('item/create');
}


exports.postCreate = async (req, res) => {
    const data = req.body;
    data.author = req.user._id;
    data.rating = 0;
    data.authorName = `${req.user.firstName} ${req.user.lastName}`
   
    
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

          const votesStrings = item.votes.map(el => el._id.toString());
           const isVoted = votesStrings.some(id => id == req.user?._id);
           const votedList = item.votes.map(el => el = el.email).join(', ');
           console.log(votedList)
        res.render('item/details', {item, isAuthor, isVoted, votedList});
   
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

exports.postVote = async (req, res) => {
    const itemId = req.params._id;
    const userId = req.user._id;
    const vote = req.params._vote 

    try{ 
         const item = await itemService.getOne(itemId);
         let rating = item.rating;
         switch(vote){
            case 'up': rating += 1; break;
            case 'down': rating -= 1; break;
         }
              await itemService.updateVote(itemId, userId, rating);

             res.redirect(`/details/${itemId}`);
            }catch(error){
                console.log(error);
                res.redirect('/404');    
            }

}  

exports.getMyPostsPage = async (req, res ) => {
    const user = await authService.getUser(req.user.email).populate('myPosts').lean()
res.render('item/myPosts', {user})
}









