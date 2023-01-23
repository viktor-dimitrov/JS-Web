const catsDb = require('../catsDb.json');
const save = require('../models/breeds');
const breedDb = require('../breedDb.json');
const addCat = require('../models/addCat');


exports.getAddCatPage = (req, res) => {
    res.render('addCat', {breeds: breedDb});
}

exports.postCat = async (req, res) => {
       await addCat(req, res, catsDb);
    res.redirect('/');
}


exports.getAddBreedPage = (req, res) => {
    res.render('addBreed');
}

exports.postBreed = (req, res) => {
    save.saveBreed(req, res);

}

exports.getEditPage = (req, res) => {
    const catId = Number(req.params.catId);

    const currCat = catsDb.find(cat => cat.id === catId);
    
    res.render('editCat', {breeds: breedDb, currCat });
}