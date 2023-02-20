
const itemService = require('../services/itemService')

exports.getHomePage = async (req, res) => {

    try{
        const result = await itemService.getAll();
        const top3 = result.slice(0, 3);

         res.render('home',{top3});
    }catch(error){
        res.redirect('/404');
    }

}

exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}

exports.getSearchPage =(req, res) => {
            res.render('home/search');
}

exports.postSearch = async(req, res) => {
    const {text} = req.body

    try{
        const result  = await itemService.searchItems(text);
        res.render('home/search', {result, text});

    }catch(error){
        res.redirect('/404');
    }

}


