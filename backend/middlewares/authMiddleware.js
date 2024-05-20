const errorFormate = require('../utils/errorFormate');
const catchError=require('./catchError');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');


exports.isAuthenticatedUser=catchError(async(req,res,next)=>{
    const {token}=req.cookies
    console.log(token)

    if(!token){
        return next(new errorFormate('Login first to access this resource',401));

    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next()
})
