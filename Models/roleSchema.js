const mongoose=require('mongoose')
const permission=require('./permissionSchema')
const {Schema}= mongoose
const schema= Schema({
    name:
    {
       type:String,
       unique:true,
       required:true
    },
    permissionId:{
            type: [Schema.Types.ObjectId], 
            default:[mongoose.Types.ObjectId('632c76f9a9df5cb55211ca4b')],
            ref: 'permission' 
         },

   
    isActive:{
        type:Number,
        default:1,
        maxLength:1
    }
})

const role=mongoose.model('role',schema)
module.exports=role