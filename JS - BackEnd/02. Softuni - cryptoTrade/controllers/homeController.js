

exports.getHomePage = (req, res) => {
    res.render('home');
}

exports.getNotFoudPage = (req, res) => {
    res.render('home/404');

}