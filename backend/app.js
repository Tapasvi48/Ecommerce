//ROOT IMPORTS 
const errorMiddleware=require("./middleware/error.js");
const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();// require express
//express use krne ke lie  
require('express-async-errors');
app.use(express.json());
app.use(cookieParser());
const user=require("./Route/userRoute.js");
const product=require("./Route/productRoute.js");
app.use("/api/v1",product);
app.use("/api/v1",user);

app.use(errorMiddleware);
module.exports=app;