
const Cube = require('../models/cube');

exports.homeView = async (req, res) => {
    const {search , from, to} = req.query;

    const expressions = [];
      
    if(search) {
        expressions.push({'name': {$regex: `${search}`, $options: 'i'}});
    }
    if(from) {
        expressions.push({'difficultyLevel': {$gte: from}});
    }
    if(to){
        expressions.push({'difficultyLevel': {$lte: to}});
    }

    let cubes = await Cube.find({$and: expressions}).lean();
   
    res.render('index', {cubes , search, from, to});
}

exports.aboutView = (req, res) => {
    res.render('about');
}

exports.notFound = (req, res) => {
    res.render('404');
}