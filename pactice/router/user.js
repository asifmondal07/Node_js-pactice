const express=require("express")
const {handelSignUp,handelSignIn,handelUserProfile}=require("../controller/user")

const requireAuth=require("../middilware/auth")
const upload =require("../middilware/multer")


const router=express.Router();

router.post("/signup",upload,handelSignUp)

router.post("/signin",handelSignIn)
router.patch("/profile",requireAuth,handelUserProfile)

module.exports=router