const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken");
const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"Please provide first name of user"]
    },
    last_name:{
        type:String,
        required:[true,"Please provide last name of user"]
    },
    email:{
        type:String,
        required:[true,"Please provide email id of user"],
        unique:[true,"Email id is already exists"],
        validate:[validator.isEmail,'Please enater email address'],
        validate:{
            validator: function(el) {
                return el.match(/^[\w.+\-]+@gmail\.com$/)
              },
              message: 'plaese use gmail'
        }


    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:[true,"please provide gender data"]
    },
    hobbies:[{
      type:String  
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    highest_education:{
        type:String
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    images:[{
        type:String
    }]
})

// Encrypt password before saving user
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

// Return JSON Webtoken
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
userSchema.methods.comparePassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}



const User=mongoose.model('User',userSchema);
module.exports=User