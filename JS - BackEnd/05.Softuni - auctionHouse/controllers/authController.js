const authService = require('../services/authService');

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
}

exports.postLogin = async (req, res) => {
    const {email, password} = req.body;
    
    try{
      const token = await authService.logUser(email, password);
      res.cookie('auth', token);
      res.redirect('/');
    }catch(error){
        console.log(error)
        return res.status(400).render('auth/login', {error});
    }
}

exports.getRegisterPage = (req, res) => {
    res.render('auth/register');
}
exports.postRegister = async (req, res) => {
    const {email, firstName, lastName, password, repassword} = req.body;

    try{
       const token =  await authService.regUser(email, firstName, lastName, password, repassword);
       res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        console.log(error)
         return res.status(400).render('auth/register', {error})
    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}