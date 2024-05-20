const express=require('express');
const app=require('./backend/app');
const dotenv=require("dotenv");
const mongoose=require('mongoose');
dotenv.config('./.env');

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database connected successfully")
}).catch(err=>console.log(err))


const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})