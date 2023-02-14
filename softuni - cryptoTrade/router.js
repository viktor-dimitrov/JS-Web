const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');
const { isAuth } = require('./middlewares/authMiddleware');

router.get('/', homeController.getHomePage);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/logout', isAuth, authController.getLogout);

router.get('/catalog', cryptoController.getCatalogPage);

router.get('/create', isAuth, cryptoController.getCreatePage);
router.post('/create', isAuth, cryptoController.postCreate);

router.get('/details/:_id', cryptoController.getDetailsPage);
router.get('/edit/:_id', isAuth, cryptoController.getEditPage);
router.post('/edit/:_id', isAuth, cryptoController.postEdit);
router.get('/delete/:_id', isAuth, cryptoController.getDelete);
router.get('/buy/:_id', isAuth, cryptoController.buyCrypto);

router.get('/search', cryptoController.getSearchPage);

router.get('/*', homeController.getNotFoudPage);

module.exports = router;