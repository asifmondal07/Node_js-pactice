const {getUser} =require("../service/auth")


async function requireAuth(req,res,next){
    const token=req.headers.auth

    if(!token){
         return res.status(401).json({ message: "Unauthorized! Please log in agin." });
    }


    const user=await getUser(token)

   if (!user) {
        return res.status(403).json({ message: "Invalid token! Please log in again." });
    }

    req.user=user;

    next()
}

module.exports=requireAuth