//sare function ko acces krta he router se 

const express=require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview} = require("../controllers/productController");
const { isAuthenticated,authorizeRoles } = require("../middleware/auth");

//sb chijo ke lie routes bnayge   basically for crud operation ke lie 
//make easy 
const router=express.Router();

//get request   
router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticated,authorizeRoles("admin"),createProduct); 
//update ke lie 
router.route("/admin/products/:id").put(isAuthenticated,authorizeRoles("admin"),updateProduct).delete(isAuthenticated,authorizeRoles("admin"),deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated,createProductReview);
router.route("/reviews").get(getAllReviews);
router.route("/reviews").delete(isAuthenticatedUser,deleteReview);  
module.exports=router;