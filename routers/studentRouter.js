const express = require("express");
const router=express.Router()
const {Student}=require('../models/students')
const authorize=require('../middlwares/authorize');
const admin = require("../middlwares/admin");

const allStudents=async (req,res)=>{
    const studnets=await Student.find()
                    .sort({
                        name:1
                    })
        res.send(studnets)
   }

const newStudents=async (req,res)=>{
    const student=new Student(req.body)
    try{
        const result=await student.save()
        res.send(result)
    }
    catch(err){
        const errMsg=[]
        for(field in err.errors){
            errMsg.push(err.errors[field].message)
        }
    }
  
}

const individualStudent=async (req,res)=>{
    const id=req.params.id;
    try{
        // const student=await Student.find()
        const student=await Student.findById(id)
        if(!student)return res.status(404).send('ID not found! on try')
        res.send(student)
    }
    catch(err){
        console.log(err)
        return res.status(404).send("ID not found...error:")
    }
   }
const updateStudents=async(req,res)=>{
    const id=req.params.id;
    const updatedData=req.body
try{    
    // const student=await Student.findByIdAndUpdate(id,{...updatedData})
    const student=await Student.findByIdAndUpdate(id,updatedData,{new:true})
    if(!student)return res.status(404).send('ID not found! on try')
    res.send(student)
}
    catch(e){
        return res.status(404).send(`ID not found...error:${e}`)
    }
   }

const deleteStudent=async(req,res)=>{
   const id=req.params.id;


try{    
    // const student=await Student.findByIdAndUpdate(id,{...updatedData})
    const student=await Student.findByIdAndDelete(id)
    if(!student)return res.status(404).send('ID not found! on try')
    res.send(student)
}
    catch(e){
        return res.status(404).send(`ID not found...error:${e}`)
    }
   }


router.route('/')
    .get(authorize,allStudents)
    .post(newStudents)
router.route('/:id')
    .get(individualStudent)
    .put(updateStudents)
    .delete([authorize,admin],deleteStudent)



// app.get('/api/students',allStudents)
// app.post('/api/students',newStudents)
// app.get('/api/students/:id',individualStudent)
// app.put('/api/students/:id',updateStudents)
// app.delete('/api/students/:id',deleteStudent)

module.exports =router