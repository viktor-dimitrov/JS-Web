const express = require('express');
const router = require('./router');
const handlebars = require('express-handlebars');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');
  
app.use( '/static', express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(router);



app.listen(5000, () => console.log("Server is listening on port 5000....") );

