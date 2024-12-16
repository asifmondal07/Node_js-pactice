const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookiename){
    return (req,res,next)=>{
        const tokencookieValue=req.cookies[cookiename];
        if(!tokencookieValue){
            return next();
        }
        try {
            const userplayload=validateToken(tokencookieValue);
            req.user=userplayload;
        } catch (error) {
            console.error("Invalid or expired token:", error.message);
            // Optionally, clear the invalid cookie
            res.clearCookie(cookiename);
        }

    return next();

    }
}


module.exports={checkForAuthenticationCookie,}