

exports.loginView = (req, res) => {
    res.render('login');
}

exports.registerView = (req, res) => {
    res.render('register');
}

exports.regUser = (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if ( password !== repeatPassword) {
        res.status(404).end();
    }

    
}