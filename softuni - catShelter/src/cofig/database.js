const mongoose = require('mongoose');


async function initDb(){
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
    console.log('Database is ready!');
}

module.exports = initDb;