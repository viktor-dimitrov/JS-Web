
const db = require('../catsDb.json');

exports.getHomePage = (req, res) => {
    res.render('index', {cats: db});
}