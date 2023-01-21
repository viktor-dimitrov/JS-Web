
const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');



router.get('/', homeController.homeView);
router.get('/about', homeController.aboutView);
router.get('/create', cubeController.createView);
router.post('/create', cubeController.addCube);
router.get('/details/:id', cubeController.detailsView);
router.get('*', homeController.notFound);



module.exports = router;