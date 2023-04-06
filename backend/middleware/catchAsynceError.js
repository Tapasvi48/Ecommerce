module.exports=func=>(req,res,next)=>{
//promises is js class
Promise.resolve(func(req,res,next)).catch(next);

};