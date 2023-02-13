const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const { isAuth } = require('./middlewares/authMiddleware');



router.get('/', homeController.getHomePage);
router.get('/logout', isAuth, authController.getLogout);

router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

router.get('/*', homeController.getNotFoudPage);

module.exports = router;