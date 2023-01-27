
const Cube = require('../models/cube');

exports.createView = (req, res) => {
    res.render('create');
}

exports.addCube = async (req, res) => {
    let cube = new Cube(req.body);
    await cube.save();
    res.redirect('/');
}

exports.detailsView = async (req, res) => {
    const selectedCube = await Cube.findById(req.params._id).lean();
    res.render('details', { cube: selectedCube });
}