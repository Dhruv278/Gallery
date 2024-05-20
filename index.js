const express=require('express');
const app=require('./backend/app');
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const globalError=require("./backend/middlewares/errorHandler")
const fileUpload=require('express-fileupload')
const cloudinary=require('cloudinary').v2
dotenv.config('./.env');

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database connected successfully")
}).catch(err=>console.log(err))


app.use(globalError)
const port=process.env.PORT || 4000;

app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(fileUpload({
    limits: { fileSize: 50* 1024 * 1024 * 1024 },
  }));


  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})