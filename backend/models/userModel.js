const mongoose=require('mongoose');
const validator=require('validator');
const userSchama=mongoose.Schema({
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
    }
})

const User=mongoose.model('user',userSchama);
module.exports=User