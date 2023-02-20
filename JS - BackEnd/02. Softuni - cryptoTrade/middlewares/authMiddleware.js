const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../lib/constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.isAuth = true;
            res.locals.user = decodedToken;


        }catch(error) {
             res.clearCookie('auth');
            console.log('Unauthorized User OOOOOOOOOOOOOOOOOOOOOOOOO');
            // res.redirect('/404')
        }
    }
    next();
}


exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/login');
    }

    next();
}