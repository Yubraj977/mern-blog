const jwt=require('jsonwebtoken')
const errorHandler=require('./error')
function verifyToken(req,res,next){
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,'unauthorized'))
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorized'));

        }
        req.user=user;
        next();
    })
}
module.exports={verifyToken}