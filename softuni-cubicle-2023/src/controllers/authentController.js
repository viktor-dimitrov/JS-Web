const authentService = require('../services/authentService');


exports.loginView = (req, res) => {
    res.render('login');
}

exports.registerView = (req, res) => {
    res.render('register');
}



exports.logUser = async (req, res) => {
    const {username, password} = req.body;
    try{
        const token = await authentService.login(username, password);
        res.cookie('token', token); 
    }catch(err){
        console.log(err);
    }

    res.redirect('/');

}



exports.regUser = async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if ( password !== repeatPassword) {
        return res.status(404).end();
    }

    const userExist = await authentService.getUser(username);

    if(userExist){
        return res.status(404).end();
    }
    const user = await authentService.register(username, password);

    res.redirect('/');
    
}

exports.outUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

}