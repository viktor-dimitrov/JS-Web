

exports.getHomePage = (req, res) => {
    console.log(req.user);
    res.render('home');
}