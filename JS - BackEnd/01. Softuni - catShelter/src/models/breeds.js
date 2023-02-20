const breedDb = require('../breedDb.json');
const fs = require('fs/promises');
const path = require('path');
const dir = path.resolve(__dirname, '../breedDb.json');

exports.saveBreed = (req, res) => {
    const input = req.body.breed;
    const breeds = breedDb.map(el => el = el.breed.toLowerCase());
  
    if(input.length < 3 ){
      res.render('addBreed', {message: "The breed must have at least three letters!"});
        return
    } else if (breeds.includes(input.toLowerCase())){
        res.render('addBreed', {message: `We already have breed "${input}" in the list!`});
        return
    } else {
        breedDb.push(req.body);
        fs.writeFile(dir, JSON.stringify(breedDb));
        res.render('addBreed', {message: `New breed "${input}" successfully added in list!`});
    }
 
}