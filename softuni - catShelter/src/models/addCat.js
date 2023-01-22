
const fs = require('fs/promises');
const path = require('path');
const dir = path.resolve(__dirname, '../uploadedFiles/')

async function addCat(req, res) {
    const file = req.files.upload[0];
    const fileName = req.files.upload[0].originalname;

    fs.writeFile(`${dir}/${fileName}`, file.buffer);

    console.log(req.files.upload[0].originalname)
    console.log(dir)

}

module.exports = addCat