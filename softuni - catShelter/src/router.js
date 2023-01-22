const router = require('express').Router();
const homeController = require('./controllers/homeController');
const catController = require('./controllers/catController');
const multer = require('multer');
const upload = multer();

router.get('/', homeController.getHomePage);
router.get('/cats/add-cat', catController.getAddCatPage);
router.get('/cats/add-breed', catController.getAddBreedPage);
router.post('/cats/add-breed', catController.postBreed);
router.get('/edit/:catId', catController.getEditPage);
router.post('/cats/add-cat',upload.fields([{name: 'upload', maxCount: 1}]), catController.postCat);


'name', 'description', 'upload', 'breed'

module.exports = router;