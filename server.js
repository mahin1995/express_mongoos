
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})///it must be use before import app
const app=require('./app')
const mongoose=require('mongoose')
// console.log(process.env)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})


mongoose.connect('mongodb://localhost:27017/my-student-2',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connected to Mongo Db")
})
.catch(err=>{
    console.error("mongodb connection Fail"+err)
})