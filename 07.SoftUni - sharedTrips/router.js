const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const itemController = require('./controllers/itemController')
const { isAuth, isAuthor } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/search', homeController.getSearchPage);
router.post('/search', homeController.postSearch);


router.get('/logout', isAuth, authController.getLogout);
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/catalog', itemController.getCatalogPage);
router.get('/details/:_id', itemController.getDetailsPage);

router.get('/create', isAuth, itemController.getCreatePage);
router.post('/create', isAuth,  itemController.postCreate);

router.get('/edit/:_id/:_author', isAuth, isAuthor, itemController.getEditPage);
router.post('/edit/:_id/:_author', isAuth, isAuthor, itemController.postEdit);

router.get('/delete/:_id/:_author', isAuth, isAuthor, itemController.getDelete);

router.get('/join/:_id', itemController.postJoin);



router.get('/*', homeController.getNotFoudPage);

module.exports = router;