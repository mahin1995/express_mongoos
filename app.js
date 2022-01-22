const express = require("express");
const app=express()
const studentRouter=require('./routers/studentRouter')
const morgan=require('morgan')
const useRouter=require('./routers/userRouter')
const authRouter=require('./routers/authRouter')

app.use(express.json())//post|put|patch -> json.object->req.body
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}
app.use('/api/user/',useRouter)
app.use('/api/students/',studentRouter)
app.use('/api/auth/',authRouter)

module.exports=app


