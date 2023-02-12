const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');


router.get('/', homeController.getHomePage);

router.get('/login', authController.getLoginPage);

router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

module.exports = router;