const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImage:{
        type:[String],
    
    },
    role:{
        type:String,
        require:true,
        default:"normal"
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User