const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const auctionController = require('./controllers/auctionController')
const { isAuth } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/logout', isAuth, authController.getLogout);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/create', auctionController.getCreatePage);
router.post('/create', auctionController.postCreate);

router.get('/catalog', auctionController.getCatalogPage);

router.get('/details/:_id', auctionController.getDetailsPage);

router.post('/bid/:_id', auctionController.postBid)

router.get('/*', homeController.getNotFoudPage);

module.exports = router;