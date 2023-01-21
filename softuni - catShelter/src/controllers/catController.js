const db = require('../catsDb.json');

exports.getAddCatPage = (req, res) => {
    res.render('addCat');
}

exports.getAddBreedPage = (req, res) => {
    res.render('addBreed');
}

exports.getEditPage = (req, res) => {
    const catId = Number(req.params.catId);

    const currCat = db.find(cat => cat.id === catId);
    
    res.render('editCat', currCat);
}