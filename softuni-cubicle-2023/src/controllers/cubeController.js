
const Cube = require('../models/cube');

exports.createCubeView = (req, res) => {
    res.render('create');
}

exports.addCube = async (req, res) => {
    let cube = new Cube(req.body);
    try{
        await cube.save();
        res.redirect('/');
    }catch(err){
        console.log(err.message);
        res.redirect('/404')
    }

}

exports.detailsView = async (req, res) => {
    const selectedCube = await Cube.findById(req.params._id).populate('accessories').lean();
    res.render('details',  selectedCube );
}