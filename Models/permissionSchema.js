const mongoose= require('mongoose')
const schema= mongoose.Schema({
   name:
   {
      type:String,
      unique:true,
      required:true
   },
   isActive:{
      type:Number,
      default:1,
      maxLength:1
  }
})

module.exports=mongoose.model('permission',schema)