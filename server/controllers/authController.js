const User=require('../models/userSchema');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
exports.signup=async(req,res)=>{
    try{
        const {firstName,lastName,email,password,registerationNumber,hostelName,confirmPassword}=req.body;
        if(!firstName||!lastName||!email||!password||!registerationNumber||!hostelName||!confirmPassword){
            return res.status(403).json({
                success:false,
                message:'All fields are required',
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password does not match',
            })
            
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists',
            })
        }
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'Could not create user',
            })
        }
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            registerationNumber,
            hostelName,
        });
        return res.status(200).json({
            success:true,
            message:'User created successfully',
            user,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:'All fields are required',
            })
        }
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User does not exist',
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            };
            const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'2h'});
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+2*60*60*1000),
                httpOnly:true,
            };
            res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                message:'User logged in successfully',
                user,
            })
        }else{
            return res.status(401).json({
                success:false,
                message:'Invalid credentials',
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};
