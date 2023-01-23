
const fs = require('fs/promises');
const path = require('path');
const uploadsDir = path.resolve(__dirname, '../uploadedFiles/');
const dir = path.resolve(__dirname, '../catsDb.json');

async function addCat(req, res, catsDb) {
    if (!req.files.upload) {
        return
    }
    const file = req.files.upload[0];
    fs.writeFile(`${uploadsDir}/${file.originalname}`, file.buffer);

    const newCat = req.body;
    newCat.id = catsDb[catsDb.length - 1].id + 1;
    newCat.image = `${uploadsDir}/${file.originalname}`;
    catsDb.push(newCat);
    fs.writeFile(dir, JSON.stringify(catsDb));
    
}

module.exports = addCat