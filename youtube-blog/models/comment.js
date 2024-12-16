const  mongoose  = require("mongoose");



const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blog', required: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user", required: true
    }

},{Timestamps:true});

const Comment=mongoose.model('comment',commentSchema);

module.exports=Comment;