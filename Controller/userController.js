const user = require("../Models/userSchema");
const role = require("../Models/roleSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
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
    let file;
    let uploadPath;

    //|| Object.keys(req.files).length===0
    if (req.files) {
      // console.log('file is attached', req.files)
      file = req.files.image;
      // console.log("the mime type: ", file.mimetype);
      const types = ["jpg", "jpeg", "png"];
      const isValidMimeType = types.includes(file.mimetype?.split("/")[1]);
      // console.log("isValidMimeType: ", isValidMimeType);
      if (isValidMimeType) {
        // console.log("this is the pdf file ");
        uploadPath = `${__dirname}/../images/` + file.name;
        // console.log('file: ',file,"upload file : ",uploadPath)
        file.mv(uploadPath, (err) => {
          if (err) {
            console.log("the error while saving file", err);
            return res.status(500);
          }
          // res.json({message:'got file'})
          // console.log("got file");
        });
      } else {
        return res.status(400).json({
          message: "only jpeg,jpg or png file are allowed ",
        });
      }
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    console.log(req.body, salt, "this is hash password", hashedPassword);

    const addUser = await user.create({
      ...req.body,
      password: hashedPassword,
      profileImage: file.name,
    });

    res.send(addUser);
  } catch (error) {
    res.status(404).json({
      message: "Failed to process SignUp",
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
    const deletedUser = await user.findByIdAndUpdate(req.params.id, {
      isActive: 2,
    });
    findUser = await user.findById(req.params.id);

    res.send(findUser);
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
    // console.log("ok", req.id);

    const userData = await user.findOne({ _id: req.id });
    // const roleId= await role.findOne({_id:userData.roleId})
    // console.log("userData  role data : ",userData)
    // console.log("userData  role ID : ",userData.roleId)

    const detail = await user.findOne({ _id: req.id }).populate({
      path: "roleId",
      populate: {
        path: "permissionId",
        model: "permission",
      },
    });

    // console.log("the detail: ", detail.roleId.permissionId);

    let permissions = detail.roleId.permissionId;
    //  permissions.map((a)=>{
    //   console.log(a)
    //   return a
    // })

    permissions.forEach((element) => {
      console.log("this is element: ", element.name);
      return element.name
    });
    // console.log(permissions);

    return res.send(permissions);
  } catch (error) {
    res.send(error.message);
  }
};
