const app=require('./app')
const dotenv=require('dotenv')
dotenv.config()
console.log(process.env.JWT_TOKEN_SECRET);

const port= 3000
const mongoose= require('mongoose')
const url=process.env.DB

mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log('data Base connected');
}).catch((e)=>{
    console.log("error",e)
})



app.listen (port,()=>{
    console.log(`app is running on ${port} Port`);
})