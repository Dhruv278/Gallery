const express=require('express');
const authRouter=require('./routes/authRoutes')
const app=express();
var cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth',authRouter);
app.get("/api/v1/test",(req,res,next)=>{
    res.status(200).json({
        message:"server is running "
    })
})

module.exports=app