const express = require('express');
const router = require('./router');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

// if app.use( express.static('public')), every request get through public folder
// if app.use( '/static', express.static('public')); only request who starts with ./static get through public folder; 
app.use( '/static', express.static('public'));
// app.use(express.urlencoded({extended: false})) -  parse url in object and can get him with req.body
app.use(express.urlencoded({extended: false}));

app.use(router);



mongoose.connect('mongodb://127.0.0.1:27017/crypto')
.then(() => app.listen(5000, () => console.log("Database is loaded and Server is listening on port 5000....") ))
.catch((error) => console.log(error)) 
    




// app.listen(5000, () => console.log("Server is listening on port 5000....") );

