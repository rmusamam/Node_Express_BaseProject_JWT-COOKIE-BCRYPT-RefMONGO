const userController = require("../Controller/userController");
const router = require("express").Router();
const {permission}= require('../AUTH/MIDDLEWARE/authorization')
const {loginValidation}= require('../AUTH/MIDDLEWARE/authorization')
const {signUpValidation}= require('../AUTH/MIDDLEWARE/authorization')

router.route("/").get(userController.show);
router.route("/signUp/").post(signUpValidation,userController.signUP);
router.route('/login').post(loginValidation,userController.login);
router.route('/:id').patch(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);
router.route('/permission').get(permission,userController.permission)
router.route('/logOut').get(permission,userController.logOut)




module.exports = router;


// const passport = require("passport");

// function isLoggedIn(req,res,next){
//     console.log('in logged in ',req)
//     req.user? next(): res.sendStatus(401)
// }
// router.get("/", (req, res) => {
//   res.write(
//     '<a href="/auth/google">Login with Google </a>'
//   );
//   res.end();
// });
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// )
// router.get('/auth/google/callback',passport.authenticate('google',{
//     successRedirect:'/protected',
//     failureRedirect:'/auth/failure'
// }))
// router.get('/auth/failure',(req,res)=>{
//     res.send('something went wrong')
// })
// router.get("/protected",isLoggedIn, (req, res) => {
//   res.send("Hello in Protected route ");
// });

