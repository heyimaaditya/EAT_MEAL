const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trime:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    registerationNumber:{
        type:String,
        required:true,
    },
    hostel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hostel",
    },
    accountType:{
        type:String,
        enum:["Student","Chief-Warden","Accountant","Committee-Member"],
        required:true,
        default:"Student",
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDetails",
    },
    complaints: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Complaint"
        }
      ],
      img: {
        type: String,//url of image
        required: true
      },
      isVerified: {
        type: Boolean,
        default: false,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }
},{timestamps:true},{strictPopulate:false});
module.exports=mongoose.model('User',userSchema);