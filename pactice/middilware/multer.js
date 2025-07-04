const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./image")
    },
    filename:function(req,file,cb){
        if(file && file.originalname){
            cb(null,Date.now() + "-" + file.originalname)
        }else{
            cb(new Error("No File Uploaded"),false)
        }
    } 
})

const upload=multer({
    storage:storage,
    limits:{fileSize:5* 1024* 1024}
}).array("profileImage")

module.exports=upload