const mongoose=require('mongoose');
require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        //useNewUrlParser:true,
        //useUnifiedTopology:true,

    })
    .then(()=>{
        console.log("DB Connected successfully");
    }).catch((err)=>{
        console.log("DB Connected failed",err);
    })
}