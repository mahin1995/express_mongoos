const jwt=require('jsonwebtoken')


module.exports=function (req,res,next){
    let token=req.header('Authorization')
    if(!token)res.status(401).send('Access denied.No token provided')
    token=token.split(" ")[1].trim()
    try{
        const decoded=jwt.verify(token,process.env.MY_SECREATE)
        req.user=decoded;
        next()
    }catch(e){
        return res.status(400).send("Invalid Token")
    }
}