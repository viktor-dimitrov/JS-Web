const express = require('express');
const config = require('./cofig');
const setupViewEngine = require('./cofig/viewEngine');
const router = require('./router');
const initDb = require('./cofig/database');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(router);


try{
    initDb()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}....`)));
}catch(err) {
    console.log(err.message);
}

