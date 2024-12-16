const jwt=require("jsonwebtoken");
const secret="AsifMondal7";

function createToken(user){
    const playload={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    };
    const token=jwt.sign(playload,secret);
    return token;
}

function validateToken(token){
    const playload=jwt.verify(token,secret);
    return playload;
}

module.exports={createToken,
                validateToken,
                };