const path=require('path')
const catchError = require('../middlewares/catchError');
const User=require('../models/userModel');
const cloudinary=require('cloudinary');
const sendImageToCloudinary = require('../utils/uploadCloudinaryImages');
const ErrorFormate = require('../utils/errorFormate');
exports.addImagesToGallery=catchError(async(req,res,next)=>{
    const images=req.images;
    console.log(images);
    // const results=await sendImageToCloudinary(images);

    const user=await User.findById(req.user._id);
    if(!user)return next(new ErrorFormate('Please login again'));
    user.images=[...user.images,...images];
    await user.save()
    res.status(200).json({
        message:"new images added"
    })
})

exports.deleteImage=catchError(async(req,res,next)=>{
    const image=req.params.image;
    const user=await User.findById(req.user._id);
    console.log(image.toString())
    const userImages=user.images.filter(img=>img!==image.toString());
    console.log(userImages)
    user.images=userImages;
    await user.save();

    res.status(200).json({
        message:"image deleted"
    })

});

