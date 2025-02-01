const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userSchema');
exports.signup=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,registerationNumber}=req.body;
        if(!firstName||!lastName||!email||!password||!registerationNumber){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }
        const exisitinguser=await User.findOne({email});
        if(exisitinguser)
            return res.status(200).send({message:"User already exist",success:false});

        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        password=hashedpassword;
        const newuser=await new User();
        await newuser.save();
        res.status(201).send({message:"registeraion Sucessful",success:true});


    } catch (error) {
        res.status(500).send({
            success:false,
            message:`Register cintroller error ${error.message}`,
        })
    }
}