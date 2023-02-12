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
    }catch(error){
        return res.render('login', { error });
    }

    res.redirect('/');

}



exports.regUser = async (req, res) => {
    const {username, password, repeatPassword} = req.body;

   

    if ( password !== repeatPassword) {
        const error = new Error ("Invalid password comfirmation!");
        return res.render('register', {error})
    }

    try{
      const existing = await authentService.getUser(username);
      const user = await authentService.register(username, password);
    }catch(error){
      
      return  res.render('register', { error })
    }

    res.redirect('/');
    
}

exports.outUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

}