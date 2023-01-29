
const fs = require('fs/promises');
const path = require('path');

const Cat = require('../models/cats');

     function addCat(req, res, catsDb) {
    if (!req.files.upload) {
        return
    }
    const file = req.files.upload[0];
    fs.writeFile(`src/public/images/${file.originalname}`, file.buffer)
    .then(() => {
        req.body.image = `images/${file.originalname}`;
        const cat = new Cat (req.body);
        cat.save();
    })
    .catch((err) => {
        console.log(err.message);
    })
}

module.exports = addCat