const authService = require('../services/authService');

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
}

exports.getRegisterPage = (req, res) => {
    res.render('auth/register');
}
exports.postRegister = async (req, res) => {
    const {username, email, password, repassword} = req.body;

    try{
        await authService.regUser(username, email, password, repassword);
    }catch(error){
        console.log(error)
    }


}