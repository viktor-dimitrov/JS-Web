const authService = require('../services/authService');

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
}

exports.postLogin = async (req, res) => {
    const {email, password} = req.body;
    
    try{
      const token = await authService.logUser(email, password);
      res.cookie('auth', token);
      console.log(token);
      res.redirect('/');
    }catch(error){
        console.log(error);
    }
}

exports.getRegisterPage = (req, res) => {
    res.render('auth/register');
}
exports.postRegister = async (req, res) => {
    const {username, email, password, repassword} = req.body;

    try{
        await authService.regUser(username, email, password, repassword);
        res.redirect('/');
    }catch(error){
        console.log(error)
    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}