const mongoose= require('mongoose')
const {Schema}=mongoose
const {role}=require('./roleSchema')


const schema= Schema({
    name:{
        type:String,
        required:true,
        uique:true
    },
    email:{
        type:String,
        required:true,
        uique:true
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
        minLength:5
    },
    roleId:{
        type: Schema.Types.ObjectId,
        ref: 'role',
        required:true,
    },
    isActive:{
        type:Number,
        default:1,
        maxLength:1
    }
})
const user=mongoose.model('user',schema)
module.exports=user