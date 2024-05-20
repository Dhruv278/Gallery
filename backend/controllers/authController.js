const User = require('../models/userModel');
const catchError=require('./../middlewares/catchError')
const errorForamte=require('./../utils/errorFormate')
const sendToken=require("./../utils/sendToken")
const cloudinary=require('cloudinary');
exports.registerUser = catchError(async (req, res, next) => {
  
    const { first_name,last_name, email, password,gender,highest_education,hobbies } = req.body;

   
    const existingUser=await User.findOne({email});

    if(existingUser){
        return next(new errorForamte("User already exist",400))
    }
    const newUser=await User.create({
        first_name,
        last_name,
        email,
        password,
        gender,
        highest_education,
        hobbies,
        images:[]
    })

    

    sendToken(newUser,200,res);

   
})



exports.loginUser=catchError(async(req,res,next)=>{
    const {email,password}=req.body;

    
    if(!email ||!password){
        return next(new errorForamte('Please enter details',404))

    }


    const user=await User.findOne({email}).select('+password');

    if(!user){
        return next(new errorForamte('Invalid Email or Password',401))

    }

    // checking if password is coorect 
    const isPasswordMatched=await user.comparePassword(password) ;

    if(!isPasswordMatched){
        return next(new errorForamte('Invalid Email or Password',401));

    }
    // const token=user.getJwtToken();

    sendToken(user,200,res);


})