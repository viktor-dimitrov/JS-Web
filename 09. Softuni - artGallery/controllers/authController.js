const authService = require('../services/authService');

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
}

exports.postLogin = async (req, res) => {
    const data = req.body;
    
    try{
      const token = await authService.logUser(data);
      res.cookie('auth', token);
      res.redirect('/');
    }catch(error){
        console.log(error)
        return res.status(400).render('auth/login', {data, error});
    }
}
  
exports.getRegisterPage = (req, res) => {
    res.render('auth/register'); 
}
exports.postRegister = async (req, res) => {
    const data = req.body;

    console.log(req.body)
 
    try{
       const token =  await authService.regUser(data);
       res.cookie('auth', token);
        res.redirect('/');
    }catch(error){
        console.log(error)
         return res.status(400).render('auth/register', {data, error})
    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}