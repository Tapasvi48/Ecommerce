const catchAsynceError = require("./catchAsynceError");
const ErrorHander=require("../utils/errorHander");
const jwt=require("jsonwebtoken");
const User=require("../model/userModel.js");

exports.isAuthenticated=catchAsynceError(async(req,res,next)=>{
const {token}=req.cookies;
//login ke samay me cookie me token store kr lia he 
if(!token){
return next(new ErrorHander("Please Login To Access this resource"));}
const decodedData=jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decodedData.id);
//user ka data accesss kr skte he 
next();
});
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
    return next(new ErrorHander(`Role: ${req.user.role} is not allowed to acces this opertion`,403))}
    next();};
    }

