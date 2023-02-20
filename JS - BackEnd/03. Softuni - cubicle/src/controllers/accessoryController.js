
const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

exports.createAccessoryView = (req, res) => {
    res.render('createAccessory');
}

exports.addAccessory = async (req, res) => {
    const accessory = new Accessory(req.body);

    try{
        await accessory.save();
        res.redirect('/');
    }catch(err){
        console.log(err.message);
        res.redirect('/404')
    }

}

exports.attachAccessoryView = async (req, res) => {
    const selectedCube = await Cube.findById(req.params._id).lean();
    const accessories = await Accessory.find({_id: { $nin: selectedCube.accessories }}).lean();


    res.render('attachAccessory', {cube: selectedCube, accessories});
}

exports.attachAccessoryToCube = async (req, res) => {
    const selectedCube = await Cube.findById(req.params._id);
    const accessoryId = req.body.accessory;
    selectedCube.accessories.push(accessoryId);
    selectedCube.save();
    res.redirect(`/details/${selectedCube._id}`);
}

