const express=require('express');
const router=express.Router();
const {login,signup}=require('../controllers/authController');
const {auth}=require('../middleware/auth.middleware');
router.post('/signup',signup);
router.post('/login',login);
module.exports=router;