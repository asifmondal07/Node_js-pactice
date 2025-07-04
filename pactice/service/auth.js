const jwt=require("jsonwebtoken")
const User=require("../model/user")
const secret="&Asikbal786&"



function setUser(user){
   
    token=jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role
    },secret,{expiresIn:"7d"})

    return token;
}

async function getUser(token){
    if(!token){
        return null
    }
    try {
        console.log(token)
        const decoded=jwt.verify(token,secret);
       
        const user=await User.findById(decoded._id)

        return user || null
    } catch (error) {
            return null
    }
}

module.exports={getUser,setUser}