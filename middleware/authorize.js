const jwt = require("jsonwebtoken");
const key    = require("../config/keys").secret;

const authorize=(req,res,next)=>{
try{
    const token = req.header("jwt-token");
    if(!token){
        return res.status(401).json({msg:"No Token Found"});
    }
    const verified= jwt.verify(token,key);
    if(!verified){
        return res.status(401).json({msg:"Token is Found ,But Not Verified"});
    }
    // if(!user.active){
    //     return res.status(401).json({msg:"You should Verify your Email"});
    // }
    req.user = verified.id;
    next();
}catch{
 res.status(500).json({error:err.message});
}
};

module.exports = authorize;