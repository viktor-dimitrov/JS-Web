
const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

router.get('/', homeController.homeView);
router.get('/about', homeController.aboutView);
router.get('/create/cube', cubeController.createCubeView);
router.post('/create/cube', cubeController.addCube);
router.get('/create/accessory', accessoryController.createAccessoryView );
router.post('/create/accessory', accessoryController.addAccessory);
router.get('/attach/accessory/:_id', accessoryController.attachAccessoryView );
router.get('/details/:_id', cubeController.detailsView);
router.get('*', homeController.notFound);



module.exports = router;