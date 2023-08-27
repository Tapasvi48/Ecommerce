const Product=require("../model/productmodel.js");
const Order=require("../model/ordermodel.js")
const ErrorHander=require("../utils/errorHander.js");
const catchAsynceError=require("../middleware/catchAsynceError.js");


//Create New order
exports.newOrder=catchAsynceError(async(req,res,next)=>{
//user type krega 
    const{shippingInfo,orderItems,paymentInfo, itemsPrice,taxPrice, shippingPrice, totalPrice}=req.body;
const order= await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id});
    res.status(201).json({
success:true,
order})




})


// get single order order details
exports.getSingleOrder=catchAsynceError(async(req,res,next)=>{
console.log(req.user._id);
const order=await Order.findById(req.params.id);
// user id jo mil rha he us ki help se name and email milega
if(!order){
    return next(new ErrorHander("Order not found with this Id",404));}
res.status(200).json({
success:true,
order,
});});

// get logined in user order
exports.myOrders=catchAsynceError(async(req,res,next)=>{
//    error show ??

    const order=await Order.find({"user":"req.user._id"});
    // user id jo mil rha he us ki help se name and email milega
    if(!order){
    return next(new ErrorHander("Order not found with this Id",404));}
    res.status(200).json({
    success:true,
    order,
    })})
// get all orders
exports.getAllOrders=catchAsynceError(async(req,res,next)=>{
        const orders=await Order.find();
        let totalAmount=0;
        orders.forEach((element) => {
            totalAmount +=element.totalPrice;
          });
        // user id jo mil rha he us ki help se name and email milega
      
        res.status(200).json({
        success:true,
        totalAmount,
        orders,
        })})
 // update order status
 exports.updateOrder=catchAsynceError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("Order not found with this id",404));}
    if(order.orderStatus=="Delivered"){
        return next(new ErrorHander("you have delivered this order",400));
    }
order.orderItems.forEach(async order=>{
await updateStock(order.product,order.quantity);});


order.orderStatus=req.body.status;
if(req.body.status=="Delivered"){
    order.deliveredAt=Date.now();
}

await order.save({validateBeforeSave:false});
    // user id jo mil rha he us ki help se name and email milega
        res.status(200).json({
        success:true,
        })})





async function updateStock(id,quantity){
const product=await Product.findById(id);
product.Stock-=quantity;
await product.save({validateBeforeSave:false});


}




// delete order
exports.deleteOrder=catchAsynceError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
return next(new ErrorHander("Order not found with this id",404));}

await order.remove;
    res.status(200).json({
    success:true,
    order,
    })})



     




