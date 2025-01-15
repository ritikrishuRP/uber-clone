const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authenticateUser = async (req,res,next) => {


    let token;

    // Check for token in cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // Check for token in authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Log the token for debugging
    console.log('Extracted Token:', token);
    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({ token : token });

    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized'  });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
}