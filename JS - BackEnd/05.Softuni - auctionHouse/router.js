const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const auctionController = require('./controllers/auctionController')
const { isAuth, isAuthor } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/logout', isAuth, authController.getLogout);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/catalog', auctionController.getCatalogPage);
router.get('/details/:_id', auctionController.getDetailsPage);

router.get('/create', isAuth, auctionController.getCreatePage);
router.post('/create', isAuth,  auctionController.postCreate);

router.get('/edit/:_id/:_author', isAuth, isAuthor, auctionController.getEditPage);
router.post('/edit/:_id/:_author', isAuth, isAuthor, auctionController.postEdit);

router.get('/delete/:_id/:_author', isAuth, isAuthor, auctionController.getDelete);

router.post('/bid/:_id', auctionController.postBid)

router.get('/*', homeController.getNotFoudPage);

module.exports = router;