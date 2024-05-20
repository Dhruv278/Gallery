const User = require('../models/userModel');
const catchError=require('./../middlewares/catchError')
const errorForamte=require('./../utils/errorFormate')
exports.registerUser = catchError(async (req, res, next) => {
    console.log("calling")
    const { first_name,last_name, email, password,gender,highest_education,hobbies } = req.body;
    
    const existingUser=await User.findOne({email});
    if(existingUser){
        return next(new errorForamte("User already exist",400))
    }
    return res.status(200).json({
        status:"success",
        user:req.body
    })
    // const user = await User.create({
       
    //     email,
    //     password,
      
    // })



    // sendToken(user, 200, res)
})