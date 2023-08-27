//isme sare function hote he jo get,post,put me ate he 
const Product=require("../model/productmodel.js");
const ErrorHander=require("../utils/errorHander.js");
const catchAsynceError=require("../middleware/catchAsynceError.js");
const Apifeature = require("../utils/apifeature.js");
const { query } = require("express");
//create product
//admin only 
exports.createProduct=catchAsynceError(async (req,res,next)=>{
req.body.user=req.user.id;



const product =await Product.create(req.body);
res.status(201).json({
    success:true,
    product
})});

//get all product
exports.getAllProducts=catchAsynceError(async(req,res,next)=>{ 
const resultperpage=2;
const productsCount=await Product.countDocuments();
const apiFeature=new Apifeature(Product.find(),req.query)
.search()
.filter();
let products=await apiFeature.query;
let filteredProductsCount=products.length;
apiFeature.pagination(resultperpage);
products=await apiFeature.query.clone();  
res.status(200).json({success:true,
    products,
    resultperpage,
    productsCount,
    filteredProductsCount,
})
});
// error in fliterd products count pagination




//update product admin action 
exports.updateProduct=catchAsynceError(async (req,res,next)=>{
let product= await Product.findById(req.params.id);
if(!product){
    return(next(new ErrorHander(404,"product not found")));}



product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,
useFindAndModify:false,});
res.status(200).json({
    success:true,
    product,
}) 

});

exports.deleteProduct=catchAsynceError(async(req,res,next)=>{
const product= await Product.findById(req.params.id);
if(!product){
    return(next(new ErrorHander("product not found",501)));}
await product.remove;
res.status(200).json({
success:true,
message:"product deleeted succesfully",
})});
//product details

exports.getProductDetails=catchAsynceError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return(next(new ErrorHander("product not found",501)));}
  
    res.status(200).json({
      success: true,
      product
    });
  });

//create new review 

exports.createProductReview=catchAsynceError(async(req,res,next)=>{
const {rating,comment,product_id}=req.body;
    const review={
user:req.user._id,
name:req.user.name,
rating:Number(rating),
comment,
} 
const product=await Product.findById(product_id);
const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());
if(isReviewed){
product.reviews.forEach(rev => {
    if(rev.user.toString()===req.user._id.toString())
   (rev.rating=rating),(rev.comment=comment)

})
}
else{
    product.reviews.push(review);
product.numOfReviews=product.reviews.length
}
let avg=0;
product.reviews.forEach(rev=>{
avg+=rev.rating;

})
product.ratings=avg/product.reviews.length;

await product.save({validateBeforeSave:false});
res.status(200).json({
    success:true,
    
})
})
//get all reviws 
exports.getAllReviews=catchAsynceError(async (req,res,next)=>{
const product=await Product.findById(req.query.id);
if(!product){
return(next(new ErrorHander("Product not found",404)));

}
res.status(200).json({
success:true,
reviews:product.reviews,})



}) 
exports.deleteReview=catchAsynceError(async(req,res,next)=>{
const product=await Product.findById(req.query.product_id);
if(!product){
return next(new ErrorHander("Product not found",404))}

const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
let avg=0;
reviews.forEach(rev=>{
avg+=rev.rating;

})
const ratings=avg/product.reviews.length;
const numOfReviews=reviews.length;
await product.findByIdAndUpdate(req.query.product_id,{
review,
ratings,
numOfReviews,
},{
new:true,
runValidators:true,
useFindAndModify:false,});

res.status(200).json({
    success:true,})

});
 