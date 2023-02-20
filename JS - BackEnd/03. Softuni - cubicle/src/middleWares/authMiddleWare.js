 const tokenService = require('../services/tokenService')

exports.auth = async (req, res, next) => {
    const rawToken = req.cookies.token;

    if (rawToken != undefined) {

        try {

            const decoded = await tokenService.verifyToken(rawToken);
            console.log(decoded)

            req.user = decoded;
            req.isAuth = true;
            res.locals.isAuth = true;
            res.locals.user = decoded.username

        } catch (err) {
            console.log(err);
            res.clearCookie('token');
            res.redirect('/');

        }

    }

   next()
}

exports.isValidToken = (req, res, next) => {
    if(!req.isAuth) {
        res.redirect('/');
    }

next()
}