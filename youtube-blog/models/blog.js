const  mongoose  = require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require:true,
    },
    coverimage:{
        type:String,
        require:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }

},{Timestamps:true});

const Blog=mongoose.model('blog',blogSchema);

module.exports=Blog;