const express=require('express')
const {User}=require('../models/user')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const authUser=async (req,res)=>{
    let user=await User.findOne({email:req.body.email})
    console.log(user)
    if (!user) return res.status(400).send("Invalid user or password")
    const validUser=await bcrypt.compare(req.body.password,user.password)
  
    if(!validUser){
        return res.status(400).send("Possword dose't match")
    }
    // const token= jwt.sign({_id:user._id,email:user.email},process.env.MY_SECREATE)
    const token= user.generateJWT()
    res.send({token:token})

}

router.route('/')
        .post(authUser)

        module.exports=router