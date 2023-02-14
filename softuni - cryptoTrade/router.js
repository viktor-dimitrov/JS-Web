const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');
const { isAuth } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/logout', isAuth, authController.getLogout);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/catalog', cryptoController.getCatalogPage);

router.get('/details/:_id', cryptoController.getDetailsPage);
router.get('/edit/:_id', cryptoController.getEditPage);
router.post('/edit/:_id', cryptoController.postEdit);
router.get('/delete/:_id', cryptoController.getDelete);

router.get('/create', cryptoController.getCreatePage);
router.post('/create', cryptoController.postCreate);

router.get('/search', cryptoController.getSearchPage);


router.get('/*', homeController.getNotFoudPage);

module.exports = router;