const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');
const { isAuth } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/logout', isAuth, authController.getLogout);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/catalog', bookController.getCatalogPage);
router.get('/details/:_id', bookController.getDetailsPage);

router.get('/wish/:_id', bookController.getWish);

router.get('/create', isAuth, bookController.getCreatePage);
router.post('/create', isAuth, bookController.postCreate);

router.get('/edit/:_id', isAuth, bookController.getEditPage);
router.post('/edit/:_id', isAuth, bookController.postEdit);


router.get('/*', homeController.getNotFoudPage);

module.exports = router;