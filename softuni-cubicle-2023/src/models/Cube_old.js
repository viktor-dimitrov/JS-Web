const db = require('../db.json');
const fs = require('fs/promises');
const path = require('path');
const dbDir = path.resolve(__dirname, '../db.json');


class Cube {
    constructor(cube){
        this.name = cube.name,
        this.description =  cube.description,
        this.imageUrl = cube.imageUrl,
        this.difficultyLevel = cube.difficultyLevel
    }

    static async save(cube){
        cube.id = db.length + 1;
        db.push(cube);
        // console.log(cube)
        // console.log(dbDir);
        fs.writeFile(dbDir, JSON.stringify(db, null, 2));
       

    }

}

module.exports = Cube