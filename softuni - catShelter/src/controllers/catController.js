const catDb = require('../catsDb.json');
const save = require('../models/breeds');
const breedDb = require('../breedDb.json');


exports.getAddCatPage = (req, res) => {
    res.render('addCat', {breeds: breedDb});
}

exports.getAddBreedPage = (req, res) => {
    res.render('addBreed');
}

exports.postBreed = (req, res) => {
    save.saveBreed(req, res);

}

exports.getEditPage = (req, res) => {
    const catId = Number(req.params.catId);

    const currCat = catDb.find(cat => cat.id === catId);
    
    res.render('editCat', {breeds: breedDb, currCat });
}