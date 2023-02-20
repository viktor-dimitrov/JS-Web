const express = require('express');
const router = require('./router');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authentication } = require('./middlewares/authMiddleware');

mongoose.set('strictQuery', false);
 
const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser()); 
app.use(authentication);

app.use(router);



mongoose.connect('mongodb://127.0.0.1:27017/trips')
.then(() => app.listen(3000, () => console.log("Database is loaded and Server is listening on port 3000....") ))
.catch((error) => console.log(error)) 
    




// app.listen(5000, () => console.log("Server is listening on port 5000....") );

