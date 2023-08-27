//ROOT IMPORTS 
const errorMiddleware=require("./middleware/error.js");
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");// require express
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});


const fileUpload=require("express-fileupload");
//express use krne ke lie  
require('express-async-errors');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
const user=require("./Route/userRoute.js");
const product=require("./Route/productRoute.js");
const order=require("./Route/orderRoutes.js");
const payment=require("./Route/paymentRoutes.js");


app.use(express.json());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment)
app.use(errorMiddleware);
module.exports=app;