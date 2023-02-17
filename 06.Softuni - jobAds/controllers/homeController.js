

exports.getHomePage = (req, res) => {
    res.render('home');
}

exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}

exports.getSearchPage = async (req, res) => {
    const {text, payment} = req.query
    
    try{
        const allCrypto = await cryptoService.searchCrypto(text, payment);
        res.render('crypto/search', {allCrypto, text, payment});
    }catch(error){
        res.redirect('/404');
    }

}