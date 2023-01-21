const { save } = require('../models/Cube');
const Cube = require('../models/Cube');
const db = require('../db.json');


exports.createView = (req, res) => {
        res.render('create');
}

exports.addCube = (req, res) => {
    let cube = new Cube(req.body);
    save(cube);
    res.redirect('/');
}

exports.detailsView = (req, res) => {
    const id = Number(req.params.id);
    const selectedCube = db.find(cube => cube.id === id);
    res.render('details', {cube: selectedCube});
}