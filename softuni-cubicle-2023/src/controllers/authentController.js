const authentService = require('../services/authentService');

exports.loginView = (req, res) => {
    res.render('login');
}

exports.logUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await authentService.login(username, password);
        
    }catch(err){
        console.log(err.message);
    }

    res.redirect('/');
   

}

exports.registerView = (req, res) => {
    res.render('register');
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