const jwt=require("jsonwebtoken")
async function identifier(req,res,next){
    const token=req.cookies.jwtToken
    
    
     if(!token){
        return res.status(401).json({
            message:"provide valid token,Unauthorized acccess"
        })
     }
     let decode = null;
     try{
    
        decode=jwt.verify(token,process.env.JWT_SECRET)
    
     }
     catch(err) { 
    return res.status(401).json({
        message:"user not authorized"
    })
         
     }
     req.user=decode;
     next()
}
module.exports=identifier