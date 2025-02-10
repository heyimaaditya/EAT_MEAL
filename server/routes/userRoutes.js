const express=require('express');
const router=express.Router();
const {login,signup,changePassword,resetPassword,resetPasswordToken}=require("../controllers/authController");
router.post('/signup',signup);
router.post('/login',login);
router.post('/changePassword',changePassword);
router.post('/reset-Password',resetPassword)
router.post('/reset-Password-Token',resetPasswordToken);
module.exports=router;