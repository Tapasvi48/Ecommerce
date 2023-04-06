//require dotenv
const dotenv=require("dotenv");
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