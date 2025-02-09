const express=require('express');
const app=express();
require("dotenv").config();
const cookieParser=require('cookie-parser');
const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const db=require('./config/db');
db.connect();
const userRoutes=require('./routes/userRoutes');
app.use('/api/v1/auth',userRoutes);
app.get('/',(req,res)=>{
    return res.json({
        message:"Hello World",
        success:true,
    })
})
const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})