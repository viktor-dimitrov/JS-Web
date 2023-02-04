
const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const authentController = require('./controllers/authentController');

router.get('/', homeController.homeView);
router.get('/about', homeController.aboutView);

router.get('/login', authentController.loginView);
router.post('/login', authentController.logUser);


router.get('/register', authentController.registerView);
router.post('/register', authentController.regUser);

router.get('/create/cube', cubeController.createCubeView);
router.post('/create/cube', cubeController.addCube);

router.get('/details/:_id', cubeController.detailsView);

router.get('/create/accessory', accessoryController.createAccessoryView );
router.post('/create/accessory', accessoryController.addAccessory);

router.get('/attach/accessory/:_id', accessoryController.attachAccessoryView );
router.post('/attach/accessory/:_id', accessoryController.attachAccessoryToCube);

router.get('*', homeController.notFound);



module.exports = router;