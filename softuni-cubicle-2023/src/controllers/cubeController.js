
const Cube = require('../models/cube');
const cubeService = require('../services/cubeService');


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
    const thisCube = await cubeService.getThisCube(req.params._id);
    res.render('details',  thisCube );
}

exports.editView = async (req, res) => {
    const thisCube = await cubeService.getThisCube(req.params._id);
    const levelsList = cubeService.difficultyEnum.map((el) => (el.key == thisCube.difficultyLevel) ? {...el, selected: true} : el );
   
    res.render('edit', {thisCube, levelsList});
}

exports.deleteView = async (req, res) => {
    const thisCube = await cubeService.getThisCube(req.params._id);

    const difficultyLevel = cubeService.difficultyEnum.find(el => el.key == thisCube.difficultyLevel);
    

    res.render('delete', {thisCube, difficultyLevel})
}

exports.updateCube = async (req, res) => {
    const cubeId = req.params._id;
    const data = req.body;
    await cubeService.updateThisCube(cubeId, data);
    res.redirect(`/details/${cubeId}`);

}

