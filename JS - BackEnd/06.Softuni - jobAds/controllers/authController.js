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
        return res.status(400).render('auth/login', {data: req.body, error});
    }
}
  
exports.getRegisterPage = (req, res) => {
    res.render('auth/register');
}
exports.postRegister = async (req, res) => {
    const {email, skills, password, repassword} = req.body;

    try{
       const token =  await authService.regUser(email, skills, password, repassword);
       res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        console.log(error)
         return res.status(400).render('auth/register', {data: req.body, error})
    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}