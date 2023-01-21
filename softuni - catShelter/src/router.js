const router = require('express').Router();
const homeController = require('./controllers/homeController');
const catController = require('./controllers/catController');

router.get('/', homeController.getHomePage);
router.get('/cats/add-cat', catController.getAddCatPage);
router.get('/cats/add-breed', catController.getAddBreedPage);
router.post('/cats/add-breed', catController.postBreed);
router.get('/edit/:catId', catController.getEditPage);




module.exports = router;