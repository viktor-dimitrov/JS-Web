 const tokenService = require('../services/tokenService')

exports.auth = async (req, res, next) => {
    const rawToken = req.cookies.token;

    if (rawToken != undefined) {

        try {

            const decoded = await tokenService.verifyToken(rawToken);
            console.log(decoded)

            req.user = decoded;
            req.isAuth = true;

        } catch (err) {
            console.log(err);

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