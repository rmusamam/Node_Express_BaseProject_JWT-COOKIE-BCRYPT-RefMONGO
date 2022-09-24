const bodyParser = require("body-parser")
const express= require("express")
const app=express()
const cookieParser = require("cookie-parser");


const dotenv=require('dotenv')
dotenv.config()

app.use(bodyParser.json())
app.use(cookieParser());

const userRoute=require('./Routes/user')
const permissionRoute= require('./Routes/permission')
const roleRoute= require('./Routes/roleRoute')

app.use('/user',userRoute)
app.use('/permission',permissionRoute)
app.use('/role',roleRoute)



app.get('/',(req,res)=>{
    console.log("this is get");
    res.send('This is BaseProject')
})

module.exports=app


//these commenting lines are related auth2 



// require('./auth')
// const session = require('express-session')
// const passport= require('passport')


// app.use(session({secret:'secret'}))
// app.use(passport.initialize())
// app.use(passport.session())
