const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../lib/constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;

        }catch(error) {
             res.clearCookie('auth');
            console.log('Unauthorized User OOOOOOOOOOOOOOOOOOOOOOOOO')
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