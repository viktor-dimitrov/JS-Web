const express = require('express');
const config = require('./cofig');
const setupViewEngine = require('./cofig/viewEngine');
const router = require('./router');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(router);


app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}....`));