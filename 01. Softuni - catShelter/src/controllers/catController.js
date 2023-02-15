// const catsDb = require('../catsDb.json');
const Cat = require('../models/cats');
const save = require('../models/breeds');
const breedDb = require('../breedDb.json');
const addCat = require('../service/addCat');

exports.getAddCatPage = (req, res) => {
    res.render('addCat', {breeds: breedDb});
}

exports.postCat = async (req, res) => {
    const cats = await Cat.find().lean();
    addCat(req, res, cats);
    res.redirect('/');
}


exports.getAddBreedPage = (req, res) => {
    res.render('addBreed');
}

exports.postBreed = (req, res) => {
    save.saveBreed(req, res);

}

exports.getEditPage = async (req, res) => {
    const catId = req.params.catId;

    const currCat = await Cat.findById(catId).lean();
    console.log(currCat)
    res.render('editCat', {breeds: breedDb, currCat });
}