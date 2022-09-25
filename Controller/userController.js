const user = require("../Models/userSchema");
const role = require("../Models/roleSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const secret = process.env.JWT_TOKEN_SECRET;
// console.log('the token of env',process.env.JWT_TOKEN_SECRET);

exports.root = async (req, res) => {
  const show = "This is base project, User Route";
  console.log(show);
  res.send(show);
};
exports.show = async (req, res) => {
  const show = await user.find();
  console.log(show);
  res.send(show);
};

exports.signUP = async (req, res) => {
  try {
    let file
    let uploadPath
    
    //|| Object.keys(req.files).length===0
    if(req.files ){
      console.log('file is attached', req.files)
      
      file=req.files.file
      uploadPath=__dirname+'ASSETS/PROFILE'
      file.mv(uploadPath,(err)=>{
        if(err){
          return res.status(500).send(err)
        }
        return res.send('got file')
      })
    }
    console.log('the sign up route')
    const salt = await bcryptjs.genSalt(10);
    
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    console.log(req.body, salt, "this is hash password", hashedPassword);

    const addUser = await user.create({
      ...req.body,
      password: hashedPassword,
    });

    res.send(addUser);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update post from DB",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log(typeof req.params.id);
    // const updatedUser=await user.findByIdAndUpdate(req.params.id,req.body)
    // const id =mongoose.Types.ObjectId(req.params.id)
    console.log("the id is: ", req.params.id);
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body);
    console.log("the update User:", updatedUser);
    res.status(200).json({
      status: "Updated",
      updatedPost: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update post from DB",
      err: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // console.log(req.params.id)
    // console.log( 'this would be error',await user.find(req.params.id))

    const deletedUser = await user.findById(req.params.id);
    deletedUser.isActive = 2;
    console.log("the deleted user : ", deletedUser);
    console.log("the active flag ", deletedUser.isActive);
    res.send(deletedUser);
    // res.write(deletedUser.isActive)
    // res.end()
    // res.sendStatus(200)
  } catch (err) {
    res.status(400).json({
      message: "Failed to update post from DB",
      err: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const validEmail = await user.findOne({ email: req.body.email });
    const validPassword = await bcryptjs.compare(
      req.body.password,
      validEmail.password
    );
    if (validPassword) {
      const token = jwt.sign({ _id: validEmail._id }, secret, {
        expiresIn: "10h",
      });

      res.cookie("access_token", token).status(200).json({
        message: "logged in successfully",
        token: token,
      });
    } else {
      console.log("in else ");
      res.status(402).json({
        message: "incorrect Password",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Failed to update post from DB",
      err: error.message,
    });
  }
};
exports.logOut = (req, res) => {
  console.log("logging out ");
  return res.clearCookie("access_token").status(200).json({
    message: "successfully LogOut ",
  });
};

exports.permission = async (req, res) => {
  try {
    console.log("ok", req.id);

    const userData= await user.findOne({_id:req.id})
    // const roleId= await role.findOne({_id:userData.roleId})
    console.log("userData  role data : ",userData.roleId)

    // const detail= await user.aggregate(
    //   [
    //     {
    //       $lookup:
    //       {
    //         from:"role",
    //         localField:"roleId",
    //         foreignField:"name",
    //         as: "userRoles"
    //       }
    //     }
    //   ]
    // )

    // const detail = await role.aggregate([
    //   {
    //     $match: { _id: ObjectId('632ca1aec273c5a5f5ed1b72') },
    //   },
    //   {
    //     $lookup: {
    //       from: "permissions",
    //       localField: "permissionId",
    //       foreignField: "_id",
    //       as: "permission",
    //     },
    //   },
    //   {
    //     $project: {
    //       name:1, "permission.name": 1,
    //     },
    //   },
    // ]);



    const detail= await user.findOne(ObjectId(req.id)).populate({
      path:'roleId',
      populate:{
        path:'permissionId',
        model:'permission'
      }
    })

    console.log("the detail: ", detail);
    return res.send(detail);
  } catch (error) {
    res.send(error.message);
  }
};
