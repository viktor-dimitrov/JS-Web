
const Cat = require('../models/cats');

exports.getHomePage = async (req, res) => {
    const cats =  await Cat.find().lean();
    res.render('index', {cats});
}