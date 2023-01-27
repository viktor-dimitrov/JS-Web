// let db = require('../db.json');
const Cube = require('../models/cube');

exports.homeView = async (req, res) => {
    const {search , from, to} = req.query;
  
    let cubes = await Cube.find().lean();

    if(search) {
        cubes = db.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(from) {
        cubes = db.filter(cube => Number(cube.difficultyLevel) >= Number(from));
    }
    if(to) {
        cubes = db.filter(cube => Number(cube.difficultyLevel) <= Number(to));
    }
    if(from && to) {
        cubes = db.filter(cube => Number(cube.difficultyLevel) >= Number(from) && Number(cube.difficultyLevel) <= Number(to));
    }

    res.render('index', {cubes , search, from, to});
}

exports.aboutView = (req, res) => {
    res.render('about');
}

exports.notFound = (req, res) => {
    res.render('404');
}