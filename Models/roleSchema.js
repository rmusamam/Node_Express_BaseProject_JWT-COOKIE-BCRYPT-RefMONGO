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
            default:[mongoose.Types.ObjectId('632ca0028f648c883e2f9389')],
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