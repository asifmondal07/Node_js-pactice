const mongoose=require("mongoose");

const userschema  =new mongoose.Schema({
    first_name:{
        type : String,
        require:true,
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    gender:{
        type:String,
    },
    job_title:{
        type:String
    }

        
    
})
const User=mongoose.model("user",userschema);   //create in mongodb table_name

module.exports=User;