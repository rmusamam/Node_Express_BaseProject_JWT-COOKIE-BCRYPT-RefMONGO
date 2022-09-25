const jwt = require("jsonwebtoken");
const user= require('../../Models/userSchema')

exports.permission=(req,res,next)=>{
    // console.log("in middle ware")
    const token= req.cookies.access_token;
    // console.log('the token: ',req.cookies)
    // console.log('the token type: ',token)


    // use this to check whether token is containing any space if so delete
    // const str = token;

    // const spaces2 = str.length - str.replace(' ', '').length;
    // console.log(spaces2);

    // return res.send(token[0])

    if(!token){
        console.log('token is empty')
        return res.sendStatus(403)
    }
    try {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, verifiedJwt) => {
            if(err){
                console.log('failure')
              res.send(err.message)
            }
            else{
                req.id=verifiedJwt._id
                // console.log('the verified token',req.id)
                next()

            }
          })
} catch (error) {
        console.log( 'token is incorrect')
        res.status(200).json({
            message:"Access Denied",
            error:error.message
        })
    }
}
exports.loginValidation= async (req,res,next)=>{
    const userFound= await user.findOne({email:req.body.email})
    if(!userFound){
        res.status(404).json({
            message:"email not found"
        })
    }
    else{
        return next()
    }
}
exports.signUpValidation= async(req,res,next)=>{
    try {
        const newUser= await user.findOne({email:req.body.email})
    console.log("in sign UP validation ",newUser)
    if(newUser){
        console.log('user exist try with an other ID')
        res.sendStatus(402).json({
            message:"user Already exist"
        })
    }else{
        return next()
    }
    } catch (error) {
        res.status(404).json({
            message:"there is some error in signUP middleWare "
            ,error:error.message
        })
    }
}