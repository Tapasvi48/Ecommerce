//require dotenv
const dotenv=require("dotenv");

const cloudinary=require("cloudinary");
const connectDatabase=require("./database");

//config ke bad call vna prapyt nhi hoga 
//path
//handling uncaught exception
process.on("uncaughtException",(err)=>{
console.log(`Error:${err.message}`);
console.log("server shutting down due to  uncaught rejection");
process.exit(1);    
})

dotenv.config({path:"backend/config/config.env"});
connectDatabase();
cloudinary.v2.config({
cloud_name:"dtef5nxa3",
api_key:"541153986816228",
api_secret:"RO-K74Z2AzVYgfELUcUylNnj8_s",
})

const app=require("./app");
//made a server 
const server=app.listen(process.env.PORT,()=>{

console.log(`server is working on:${process.env.PORT}`);
})
//console.log(youtube);
//uncaught error declare at top ?





//unhandeld promise rejections
process.on("unhandledRejection",err=>{
 console.log(`Error:${err.message}`);
 console.log('shutting down the server');
 //server close
server.close(()=>{
process.exit(1);});


})