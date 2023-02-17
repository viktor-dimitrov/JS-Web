
const itemService = require('../services/itemService')

exports.getHomePage = async (req, res) => {

    try{
        const result = await itemService.getAll();
        const top3 = result.slice((result.length - 3), result.length);

         res.render('home',{top3});
    }catch(error){
        res.redirect('/404');
    }

}

exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}




