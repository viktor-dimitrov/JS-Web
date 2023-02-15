const mongoose = require('mongoose');

const config = require('./index');

async function dataBaseInit() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URI);
    console.log('DataBase connected');
}

module.exports = dataBaseInit;

