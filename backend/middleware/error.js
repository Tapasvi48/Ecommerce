const ErrorHander=require("../utils/errorHander.js");
module.exports=(err,req,res,next)=>{
err.statusCode=err.statusCode||500;
err.message=err.message||"internal error";
//wrong id error or cast error
if(err.name==="CastError"){
    const message=`Resource not found.Invalid:${err.path}`;
    err=new ErrorHander(message,400);
}

//Mongoose duplicate err inj registratuion
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new ErrorHander(message,400);

}
//JWT token
if(err.name==="JsonWebTokenError"){
    const message=`Json web token is invalid try again`;
    err=new ErrorHander(message,400);
}
//JWT EXPIRE

if(err.name==="TokenExpiredError"){
    const message=`Json web token is expired try again`;
    err=new ErrorHander(message,400);
}
res.status(err.statusCode).json({
    success:false,
    message:err.message,
    });

};