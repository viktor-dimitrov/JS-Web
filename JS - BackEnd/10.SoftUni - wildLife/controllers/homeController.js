
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



exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}




