
const Cube = require('../models/cube');

exports.createCubeView = (req, res) => {
    res.render('create');
}

exports.addCube = async (req, res) => {
    let cube = new Cube(req.body);
    await cube.save();
    res.redirect('/');
}

exports.detailsView = async (req, res) => {
    const selectedCube = await Cube.findById(req.params._id).populate('accessories').lean();
    res.render('details',  selectedCube );
}