const express=require("express");
const {registerUser, LoginUsers, Logout, ForgetPassword, ResetPassword, getUserDetails, updateUserPassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser}=require("../controllers/userController.js");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth.js");
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(LoginUsers);
router.route("/password/forgot").post(ForgetPassword); 
router.route("/password/reset/:token").put(ResetPassword);
router.route("/logout").get(Logout);
router.route("/me").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated,updateUserPassword);
router.route("/me/update").put(isAuthenticated,updateProfile);
router.route("/admin/users").get(isAuthenticated,authorizeRoles("admin"),getAllUser);
router.route("/admin/users/:id").get(isAuthenticated,authorizeRoles("admin"),getSingleUser).put(isAuthenticated,authorizeRoles("admin"),updateRole).delete(isAuthenticated,authorizeRoles("admin"),deleteUser);

module.exports=router;



