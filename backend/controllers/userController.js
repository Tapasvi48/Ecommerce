const ErrorHander=require("../utils/errorHander.js");
const catchAsynceError=require("../middleware/catchAsynceError.js"); 
const User=require("../model/userModel.js");
const sendToken = require("../utils/JWTtoken.js");
const sendEmail=require("../utils/sendEmail.js");
const crypto=require("crypto");
const validator=require("validator");
//Register
exports.registerUser=catchAsynceError(async(req,res,next)=>{
const{name,email,password}=req.body;
const user=await User.create(
    {name,
    email,
    password,
    avatar:{
public_id:"temporary id",
url:"profileurl",}
    }); 

sendToken(user,201,res);

 


});

exports.LoginUsers=catchAsynceError(async(req,res,next)=>{

const {email,password}=req.body;
if(!password||!email){
    return next(new ErrorHander("please enter email and  password ",400));
    }
const user=await User.findOne({email}).select("+password");
if(!user){
    return next(new ErrorHander("Invalid email or password",401));
}
const isPasswordMatched=await user.comparePassword(password);
if(!isPasswordMatched){
return next(new ErrorHander("Invald email and pasword",401));
}


sendToken(user,200,res);




});
exports.Logout=catchAsynceError((req,res,next)=>{
res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
})



    res.status(200).json({
success:true,
message:"successfully logout",



    })
})
exports.ForgetPassword=catchAsynceError(async (req,res,next)=>{
const user=await User.findOne({email:req.body.email});
if(!user){
    return next(new ErrorHander("user not found ",404));
}
//GEt resrt password token 
const resetToken=user.getResetPasswordToken();
//save nhi hua hash vala token 
await user.save({validateBeforeSave:false});
const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
const message=`Your reset Password Token is-:\n \n${resetPasswordUrl}\n \n 
if you have requested this email then please ignore it `;
try{
await sendEmail({
email:user.email,
subject:`Ecommerce password recovery`,
message,
});
res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} succesffuly`,
})


}catch(error){
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save({validateBeforeSave:false});
return next(new ErrorHander(error.message,500));
}


})
//reset password
exports.ResetPassword=catchAsynceError(async (req,res,next)=>{
const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
const user=await User.findOne({
resetPasswordToken,
resetPasswordExpire:{$gt: Date.now()},
});
if(!user){
    return next(new ErrorHander("reset password token has been expired ",400))
}
if(req.body.password!==req.body.confirmPassword){
    return next(new ErrorHander("password does not match ",400))}
user.password=req.body.password;
user.resetPasswordExpire=undefined;
user.resetPasswordToken=undefined;
await user.save();
sendToken(user,200,res);




});
exports.getUserDetails=catchAsynceError(async (req,res,next)=>{
const user=await User.findById(req.user.id);
//jisne login kr rkha he vhi res.user kr skta he
//res 3 trike params body query or user in middleware of jwt token jisme hmne user ki information store kri thi 
res.status(200).json({
success:true,
user,});
})
exports.updateUserPassword=catchAsynceError(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
if(!isPasswordMatched){
return next(new ErrorHander("Password incorrect",401));
}

if(req.body.newPassword!==req.body.confirmPassword){
    return next(new ErrorHander("Password does not match",401));}
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
    //jisne login kr rkha he vhi res.user kr skta he
    //res 3 trike params body query or user in middleware of jwt token jisme hmne user ki information store kri thi 
    res.status(200).json({
    success:true,
    user,});
    })
exports.updateProfile=catchAsynceError(async(req,res,next)=>{
const newUserData={
name:req.body.name,
email:req.body.email,}
//avatar latter
const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
new:true,
runValidators:true,
useFindAndModify:false,
});
//validator not working
res.status(200).json({
    success:true,
});
});
//get all user //admin
exports.getAllUser=catchAsynceError(async(req,res,next)=>{
    const users= await User.find();
    res.status(200).json({
    success:true,
        users,
    });})
    exports.getSingleUser=catchAsynceError(async(req,res,next)=>{
        const user= await User.findById(req.params.id);
        if(!user){
            return(next(new ErrorHander(`User does not exist ${req.params.id}`,400)));
        }
        res.status(200).json({
        success:true,
            user,
        });})
        //updating user role by admin 
        exports.updateRole=catchAsynceError(async(req,res,next)=>{
            const newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.user.role,}
            //avatar latter
            const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
            });
            //validator not working
            res.status(200).json({
                success:true,
            });
            });
//delete user profile
            exports.deleteUser=catchAsynceError(async(req,res,next)=>{
    
                //avatar latter
                //req.user nhi krna 
                const user=await User.findById(req.params.id);
                if(!user){
                    next(new ErrorHander(`user does not exist with ${req.params.id}`,400));
                }
                await user.deleteOne();
                //validator not working
                res.status(200).json({
                    success:true,
                });
                });
    
