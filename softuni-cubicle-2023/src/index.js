
const express = require('express');

const config = require('./config');
const setupViewEngine = require('./config/viewEngine');
const router = require('./routes');
const initDb = require('./config/dataBase');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(router);

initDb()
.then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}....`)))
.catch((err) => console.log(err.message));


