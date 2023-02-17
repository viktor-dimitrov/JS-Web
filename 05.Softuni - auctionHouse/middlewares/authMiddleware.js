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

exports.isAuthor = (req, res, next) => {
    console.log(req.user._id)
    console.log(req.params._id)
    if(req.user._id != (req.params._author)){
      
        return res.redirect('home/404');
    }
    next();
}