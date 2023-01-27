
const Cube = require('../models/cubes');
// const db = require('../modelswefwefwe');


exports.createView = (req, res) => {
        res.render('create');
}

exports.addCube = async (req, res) => {
    let cube = new Cube(req.body);
    await cube.save()
    res.redirect('/');
}

exports.detailsView = (req, res) => {
    const id = Number(req.params.id);
    const selectedCube = db.find(cube => cube.id === id);
    res.render('details', {cube: selectedCube});
}