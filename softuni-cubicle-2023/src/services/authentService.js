const User = require('../models/user');


exports.register = (username, password) => User.create({username, password});

exports.getUser = (username) => User.findOne({username});