const express=require('express');
const cors=require('cors');
const cookieparser=require('cookie-parser');
const app=express();
require("dotenv").config();
const db=require("./config/db");
db.connect();
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"server is running and up",
    })
})
const port=process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`app is running on port:${port}`);
})
