module.exports=function(req,res,next){
    if(req.user.role!=="admin")return res.status(403).send("Forbidden!! You are not allow to delete this")
    next()
}