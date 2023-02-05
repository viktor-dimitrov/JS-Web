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




// console.log(req)

    // if(rawToken){
       
        // try{
        //     const decodedToken = await verifyToken(rawToken);
        //     console.log(decodedToken)

        //     // req.user = decodedToken;
        //     // req.validToken = true;

        // }catch(err){

        //     console.log(err);

        //     // res.clearCookie('token ');
        //     res.redirect('/404');
        // }
      
    // }

   next()
}

exports.isValidToken = (req, res, next) => {
    if(!req.isAuth) {
        res.redirect('/');
    }

next()
}