const catchAsyncErrors=require("../middleware/catchAsynceError.js");
const stripe=require("stripe")(sk_test_51NShgOSCditigOEjaGHBipnuQdRhS5J5FMVLBZ9Xma9pp4xmkgcSOseftQyAbO3nLz4RQKxg17pTb0iTXoOFRjyb00mbzOfGL7);
exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
const myPayment=await stripe.paymentIntents.create({
amount:req.body.amount,
currency:"inr",
metadata:{
company:"Ecommerce"}
})

res.status(200).json({success:true,client_secret:myPayment.client_secret})




})
exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{   
res.status(200).json({stripeApiKey:pk_test_51NShgOSCditigOEjTz4wZEWf4Z8RVWAsD2SW19vSCM4MHaJm5m0HZP7QZmvnPns4xZ5ajWNntoSQW48HzZ3yhynH00GwORPFtR});

})