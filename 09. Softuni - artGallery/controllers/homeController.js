
const itemService = require('../services/itemService')
const authService = require('../services/authService')

exports.getHomePage = async (req, res) => {

    try{
        const items = await itemService.getAll();
         res.render('home',{items});
    }catch(error){
        res.redirect('/404');
    }
 
}

exports.getProfilePage = async (req, res ) => {
        const user = await authService.getUser(req.user.username).populate('publications').populate('shares').lean();
        const sharesList = user.shares.map(el => el = el.title).join(', ');
        const publicationsList = user.publications.map(el => el = el.title).join(', ');
      
    res.render('home/profile', {user, sharesList, publicationsList})
}

exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}




