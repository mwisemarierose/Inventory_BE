const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    try{
        const token = req.headers.token;
        if(!token){
            res.status(401);
            throw new Error('Not authorized, please login1');
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verified",verified);
        
        //get user from token
        const user = await User.findById(verified.id).select('-password');
        console.log("user",user)

        if(!user){
            res.status(401);
            throw new Error('Not authorized, token failed2');
        }

        req.user = user;
        next();
    }catch(err){
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
})

module.exports = protect