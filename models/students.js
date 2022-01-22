const {Schema,model}=require('mongoose')

const Student=model('Student',Schema({
    name:{type:String,required:true},
    age:{type:Number,min:0},
    hobbies:{
        type:Array,
        of:String,
        validate:{
            validator:(value)=>{
                return value.length>0
            },
            messege:"There must be at least 1 hobby"
        }
    }
}))

module.exports.Student=Student